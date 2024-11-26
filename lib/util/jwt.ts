import { ValidationResponse } from "./types";

export function getJwtSecret(): ValidationResponse {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in the environment variables");
    return { success: false, message: "Internal Server Error" };
  }

  return { success: true, data: jwtSecret };
}

/**
 * Encode a string secret into Uint8Array
 */
export function encodeSecret(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}
