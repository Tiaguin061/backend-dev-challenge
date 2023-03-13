import { SaveFileInput, StorageProvider } from 'src/shared/providers/storageProvider/models/storage-provider';

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { storageConfig } from 'src/config/storage';

export class inMemoryStorageProvider implements StorageProvider {
  async saveFile({ buffer, filename }: SaveFileInput): Promise<string> {
    const id = crypto.randomUUID();

    await fs.promises.writeFile(`./tmp/uploads/${id}-${filename}`, buffer);
    
    return `${id}-${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.resolve(
      storageConfig.config.disk.paths.uploadsFolder,
      filename,
    );

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

