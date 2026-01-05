import crypto from "crypto";

const KEY = Buffer.from(process.env.SECRET_KEY!, "base64");

export function encryptId(id: string) {
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(id, "utf8"),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    // URL-safe
    return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptId(payload: string) {
    const buffer = Buffer.from(payload, "base64url");

    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);

    const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
    ]);

    return decrypted.toString("utf8");
}
