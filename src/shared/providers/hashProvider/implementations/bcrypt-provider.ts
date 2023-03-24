import { HashProvider } from '../models/hash-provider';
import bcrypt from 'bcrypt';

export class BcryptProvider implements HashProvider {
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    const matched = await bcrypt.compare(data, encrypted);

    return matched;
  }

  async hash(
    data: string | Buffer,
    saltOrRounds?: string | number,
  ): Promise<string> {
    const hash = await bcrypt.hash(data, saltOrRounds || 10);

    return hash;
  }
}
