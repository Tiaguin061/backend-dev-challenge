export interface SaveFileInput {
  filename: string;
  buffer: Buffer;
}

export abstract class StorageProvider {
  abstract saveFile(data: SaveFileInput): Promise<string>;
  abstract deleteFile(filename: string): Promise<void>;
}
