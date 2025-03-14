
import OpenAI from "openai";

// Função para obter a chave da API do localStorage
const getApiKey = (): string | null => {
  return localStorage.getItem("openai_api_key");
};

// Inicializa o cliente da OpenAI com a chave da API
const getOpenAIClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API key not found");
  }
  
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Somente para desenvolvimento, remova em produção
  });
};

// Mensagem de sistema que define o comportamento do assistente
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
 * @returns boolean indicando se a chave existe
 */
export const isApiKeyConfigured = (): boolean => {
  return !!getApiKey();
};

/**
 * Salva a chave da API no localStorage
 * @param key Chave da API da OpenAI
 */
export const saveApiKey = (key: string): void => {
  localStorage.setItem("openai_api_key", key);
};

/**
 * Envia uma mensagem para a API da OpenAI e retorna a resposta.
 * 
 * @param message Mensagem do usuário
 * @param language Idioma atual (para garantir que a resposta venha no mesmo idioma)
 * @returns Promise com a resposta da API
 */
export const sendMessageToOpenAI = async (message: string, language: string): Promise<string> => {
  try {
    if (!isApiKeyConfigured()) {
      return "Por favor, configure sua chave API da OpenAI para continuar a conversa.";
    }

    const openai = getOpenAIClient();

    // Ajusta o pedido de idioma baseado na seleção atual
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
