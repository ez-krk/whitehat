import { Ed25519Ecies } from "@whitehat-xyz/ed25519-ecies";

export class BindGen {
  constructor() {}

  async encrypt(message, to, from) {
    return await Ed25519Ecies.encrypt(message, to, from);
  }

  async decrypt(message, to) {
    return await Ed25519Ecies.decrypt(message, to);
  }
}
