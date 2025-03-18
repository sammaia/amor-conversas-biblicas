
import OpenAI from "openai";
import { getConfig, saveConfig, hasConfig, ConfigKeys } from "./configService";

// Function to get the API key from the configuration service
const getApiKey = (): string | null => {
  return getConfig(ConfigKeys.OPENAI_API_KEY);
};

// Initialize the OpenAI client with the API key
const getOpenAIClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API key not found");
  }
  
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Only for development, remove in production
  });
};

// System message that defines the assistant's behavior
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
 * Checks if the API key is configured
 * @returns boolean indicating if the key exists
 */
export const isApiKeyConfigured = (): boolean => {
  return hasConfig(ConfigKeys.OPENAI_API_KEY);
};

/**
 * Saves the API key securely
 * @param key OpenAI API key
 */
export const saveApiKey = (key: string): void => {
  saveConfig(ConfigKeys.OPENAI_API_KEY, key);
};

/**
 * Sends a message to the OpenAI API and returns the response.
 * 
 * @param message User message
 * @param language Current language (to ensure response in the same language)
 * @returns Promise with the API response
 */
export const sendMessageToOpenAI = async (message: string, language: string): Promise<string> => {
  try {
    if (!isApiKeyConfigured()) {
      return "Por favor, configure sua chave API da OpenAI para continuar a conversa.";
    }

    const openai = getOpenAIClient();

    // Adjust language prompt based on current selection
    let languagePrompt = "";
    if (language === "pt") {
      languagePrompt = "Responda em português brasileiro.";
    } else if (language === "es") {
      languagePrompt = "Responda en español.";
    } else {
      languagePrompt = "Answer in English.";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Cheaper model
      messages: [
        { role: "system", content: systemMessage + " " + languagePrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Return the response or a friendly error message
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
