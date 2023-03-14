import {
  SaveFileInput,
  StorageProvider,
} from 'src/shared/providers/storageProvider/models/storage-provider';

import crypto from 'crypto';

export class InMemoryStorageProvider implements StorageProvider {
  async saveFile({ filename }: SaveFileInput): Promise<string> {
    const id = crypto.randomUUID();

    return `${id}-${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    return;
  }
}
