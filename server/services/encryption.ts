import argon from "argon2";

export async function hash(data: string) {
  return await argon.hash(data);
}
export async function verify(hash: string, data: string): Promise<boolean> {
  return await argon.verify(hash, data);
}
