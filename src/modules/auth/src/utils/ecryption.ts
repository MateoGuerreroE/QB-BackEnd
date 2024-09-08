import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
dotenv.config();
const { GLOBAL_SALT } = process.env;

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password + GLOBAL_SALT, 10);
  return hash;
}

export async function verifyPassword(
  password: string,
  userLogin: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password + GLOBAL_SALT, userLogin);
  return isMatch;
}
