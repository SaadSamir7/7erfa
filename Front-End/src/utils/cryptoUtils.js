import CryptoJS from "crypto-js";

const secretKey =
  import.meta.env.VITE_SECRET_KEY || "default-fallback-key-123456789";

// Encrypt a value
export const encrypt = (value) => {
  if (!value) {
    console.warn("encrypt: No value provided for encryption");
    return "";
  }
  try {
    return CryptoJS.AES.encrypt(value.toString(), secretKey).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return value.toString(); // Fallback to original value
  }
};

// Decrypt a value
export const decrypt = (encryptedValue) => {
  if (!encryptedValue) {
    console.warn("decrypt: No value provided for decryption");
    return "";
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || encryptedValue; // Fallback to original if decryption fails
  } catch (error) {
    console.error("Decryption error:", error);
    return encryptedValue; // Fallback to original value
  }
};
