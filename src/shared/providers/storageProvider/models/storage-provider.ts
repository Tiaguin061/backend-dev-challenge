export interface SaveFileInput {
  filename: string;
  buffer: Buffer;
}

export interface UpdateFileInput {
  newFilename: string;
  oldFilename: string;
  newFilenameBuffer: Buffer;
}

export abstract class StorageProvider {
  abstract saveFile(data: SaveFileInput): Promise<string>;
  abstract deleteFile(filename: string): Promise<void>;
  abstract updateFile(data: UpdateFileInput): Promise<string>;
}
