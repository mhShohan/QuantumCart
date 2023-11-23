import bcrypt from 'bcrypt';

export default async function hash(password: string) {
  return await bcrypt.hash(password, 10);
}
