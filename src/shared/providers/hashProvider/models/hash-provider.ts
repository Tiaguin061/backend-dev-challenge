export abstract class HashProvider {
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
  abstract hash(
    data: string | Buffer,
    saltOrRounds?: string | number,
  ): Promise<string>;
}
