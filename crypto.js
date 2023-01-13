import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import utils from "ethereum-cryptography/utils.js";
import { sha256 } from "ethereum-cryptography/sha256.js";
import secp from "ethereum-cryptography/secp256k1.js";

export function toHash(x) {
  return toHex(sha256(utf8ToBytes(x)));
}

export function generateKey() {
  return toHex(secp.utils.randomPrivateKey());
}
