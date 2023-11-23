import bcrypt from 'bcrypt';

// take password and return hashed password
export default async function hash(password: string) {
  return await bcrypt.hash(password, 10);
}
