
import CryptoJS from 'crypto-js';

// Chave de criptografia baseada em uma constante da aplicação
// (Uma abordagem melhor seria usar um valor dinâmico ou específico do ambiente)
const ENCRYPTION_KEY = 'deus-e-amor-app-secret-key';

// Enum com as chaves de configuração disponíveis
export enum ConfigKeys {
  OPENAI_API_KEY = 'openai_api_key',
  BIBLE_API_KEY = 'bible_api_key',
}

/**
 * Salva uma configuração de forma criptografada
 * @param key Chave da configuração
 * @param value Valor a ser salvo
 */
export const saveConfig = (key: ConfigKeys, value: string): void => {
  if (!value) return;
  
  // Criptografa o valor antes de salvar
  const encryptedValue = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  localStorage.setItem(key, encryptedValue);
};

/**
 * Obtém uma configuração descriptografada
 * @param key Chave da configuração
 * @returns Valor descriptografado ou null se não existir
 */
export const getConfig = (key: ConfigKeys): string | null => {
  const encryptedValue = localStorage.getItem(key);
  
  if (!encryptedValue) return null;
  
  try {
    // Descriptografa o valor
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Erro ao descriptografar configuração:', error);
    return null;
  }
};

/**
 * Remove uma configuração
 * @param key Chave da configuração
 */
export const removeConfig = (key: ConfigKeys): void => {
  localStorage.removeItem(key);
};

/**
 * Verifica se uma configuração existe
 * @param key Chave da configuração
 * @returns true se a configuração existir, false caso contrário
 */
export const hasConfig = (key: ConfigKeys): boolean => {
  return getConfig(key) !== null;
};

/**
 * Inicializa as chaves de API padrão apenas para desenvolvimento
 * Em ambiente de produção, defina esta função para não fazer nada.
 */
export const initializeDefaultApiKeys = (): void => {
  // Em produção, este bloco não deve existir ou deve estar vazio
  if (import.meta.env.DEV) {
    // Se você quiser definir chaves padrão para desenvolvimento:
    // if (!hasConfig(ConfigKeys.OPENAI_API_KEY)) {
    //   saveConfig(ConfigKeys.OPENAI_API_KEY, 'sua-chave-de-desenvolvimento');
    // }
  }
};
