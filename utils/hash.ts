import {createHmac} from "crypto";

export function createHash(text: string, salt: string): string {
    const hash = createHmac('sha512', salt)
        .update(text)
        .digest('hex');
    return hash;
}