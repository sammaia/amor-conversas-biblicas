
import OpenAI from "openai";
import { getConfig, saveConfig, hasConfig, ConfigKeys } from "./configService";
import { supabase } from "@/integrations/supabase/client";

// Função para obter a chave da API do Supabase ou do localStorage como fallback
const getApiKey = async (): Promise<string | null> => {
  try {
    // Tentar buscar do Supabase primeiro
    const { data, error } = await supabase.functions.invoke('api-keys', {
      method: 'POST',
      body: { method: 'GET', action: 'openai' }
    });

    if (error) {
      console.error("Erro ao buscar chave da API do Supabase:", error);
      // Fallback: tentar buscar do localStorage
      return getConfig(ConfigKeys.OPENAI_API_KEY);
    }

    return data.key;
  } catch (error) {
    console.error("Erro ao buscar chave da API:", error);
    // Fallback: tentar buscar do localStorage
    return getConfig(ConfigKeys.OPENAI_API_KEY);
  }
};

// Inicializa o cliente OpenAI com a chave da API
const getOpenAIClient = async () => {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("API key not found");
  }
  
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Apenas para desenvolvimento, remover em produção
  });
};

// Mensagem do sistema que define o comportamento do assistente
const systemMessage = `
Você é um assistente espiritual cristão evangélico que responde baseando-se exclusivamente na Bíblia.
Seu objetivo é ajudar os usuários a encontrar orientação espiritual, entender passagens bíblicas
e receber apoio emocional através de ensinamentos cristãos.

Ao responder:
1. Cite versículos relevantes da Bíblia que apoiam sua resposta
2. Mantenha um tom acolhedor, empático e inspirador
3. Enfatize sempre que "Deus é amor"
4. Use linguagem simples e acessível
5. Nunca invente versículos ou informações falsas
6. Evite doutrinas controversas ou divisivas
7. Não faça afirmações sobre o futuro, predições ou profecias
8. Redirecione qualquer conteúdo com teor racista ou preconceituoso para ensinamentos de amor, igualdade e respeito

Você deve manter o mesmo idioma que o usuário utiliza (português, inglês ou espanhol).
`;

/**
 * Verifica se a chave da API está configurada
 * @returns Promise com boolean indicando se a chave existe
 */
export const isApiKeyConfigured = async (): Promise<boolean> => {
  // Primeiro, verifica no Supabase
  try {
    const { data, error } = await supabase.functions.invoke('api-keys', {
      method: 'POST',
      body: { method: 'GET', action: 'openai' }
    });

    if (!error && data.key) {
      return true;
    }
  } catch (error) {
    console.error("Erro ao verificar chave da API no Supabase:", error);
  }

  // Fallback: verificar no localStorage
  return hasConfig(ConfigKeys.OPENAI_API_KEY);
};

/**
 * Salva a chave da API no Supabase e como fallback no localStorage
 * @param key Chave da API OpenAI
 */
export const saveApiKey = async (key: string): Promise<void> => {
  try {
    // Tenta salvar no Supabase
    const { data, error } = await supabase.functions.invoke('api-keys', {
      method: 'POST',
      body: { method: 'POST', action: 'openai', key }
    });

    if (error) {
      console.error("Erro ao salvar chave da API no Supabase:", error);
      // Fallback: salvar no localStorage
      saveConfig(ConfigKeys.OPENAI_API_KEY, key);
    }
  } catch (error) {
    console.error("Erro ao salvar chave da API:", error);
    // Fallback: salvar no localStorage
    saveConfig(ConfigKeys.OPENAI_API_KEY, key);
  }
};

/**
 * Envia uma mensagem para a API da OpenAI e retorna a resposta.
 * 
 * @param message Mensagem do usuário
 * @param language Idioma atual (para garantir resposta no mesmo idioma)
 * @returns Promise com a resposta da API
 */
export const sendMessageToOpenAI = async (message: string, language: string): Promise<string> => {
  try {
    if (!(await isApiKeyConfigured())) {
      return "Por favor, configure sua chave API da OpenAI para continuar a conversa.";
    }

    const openai = await getOpenAIClient();

    // Ajusta o prompt de idioma com base na seleção atual
    let languagePrompt = "";
    if (language === "pt") {
      languagePrompt = "Responda em português brasileiro.";
    } else if (language === "es") {
      languagePrompt = "Responda en español.";
    } else {
      languagePrompt = "Answer in English.";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Modelo mais barato
      messages: [
        { role: "system", content: systemMessage + " " + languagePrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Retorna a resposta ou uma mensagem de erro amigável
    return completion.choices[0]?.message?.content || 
           "Desculpe, não consegui processar sua mensagem neste momento. Por favor, tente novamente.";
  } catch (error) {
    console.error("Erro ao comunicar com a OpenAI:", error);
    if (error instanceof Error && error.message === "API key not found") {
      return "Por favor, configure sua chave API da OpenAI nas configurações para continuar a conversa.";
    }
    return "Estou em oração neste momento. Por favor, tente novamente em alguns instantes.";
  }
};

/**
 * Function that returns the last messages from a conversation formatted for OpenAI
 * This will be useful for maintaining context in a conversation
 * 
 * @param messages Array of messages from the conversation
 * @param maxTokens Maximum number of tokens to include
 * @returns Array of messages formatted for OpenAI
 */
export const getFormattedMessagesForAPI = (messages, maxTokens = 2000) => {
  // Start with the system message
  const formattedMessages = [
    { role: "system", content: systemMessage }
  ];
  
  // Add the most recent messages, up to a certain token limit
  // This is a simplified approach - in a real app you'd want to count tokens properly
  let estimatedTokens = systemMessage.length / 4; // Rough estimate: 4 chars ≈ 1 token
  
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    const estimatedMessageTokens = message.text.length / 4;
    
    if (estimatedTokens + estimatedMessageTokens > maxTokens) {
      break;
    }
    
    formattedMessages.unshift({
      role: message.sender === "user" ? "user" : "assistant",
      content: message.text
    });
    
    estimatedTokens += estimatedMessageTokens;
  }
  
  return formattedMessages;
};
