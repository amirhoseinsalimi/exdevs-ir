import * as bcrypt from 'bcrypt';

export function hashPassword(plainPassword: string) {
  const saltRounds = 10;

  return bcrypt.hash(plainPassword, saltRounds);
}
