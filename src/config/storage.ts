import { MulterError, StorageEngine, diskStorage } from 'multer';

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export type StorageDrivers = 's3' | 'disk';

type StorageConfig = {
  driver: StorageDrivers;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {
      paths: {
        tmpFolder: string;
        uploadsFolder: string;
      };
    };
    s3: {
      bucket: string;
    };
  };
};

const tmpFolder = path.resolve('tmp');

function createFolders() {
  const tmpFolderDir = './tmp';

  if (!fs.existsSync(tmpFolderDir)) {
    fs.mkdirSync(tmpFolderDir);
  }

  const uploadsFolderDir = './tmp/uploads';

  if (!fs.existsSync(uploadsFolderDir)) {
    fs.mkdirSync(uploadsFolderDir);
  }
}

createFolders();

const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  multer: {
    storage: diskStorage({
      destination: (request, file, callback) => {
        let error: Error | null = null;
        type TMime =
          | 'image/png'
          | 'image/jpeg'
          | 'image/jpg'
          | 'image/gif'
          | 'image/svg';

        const mimeTypes = {
          'image/png': 'png',
          'image/jpeg': 'jpeg',
          'image/jpg': 'jpg',
          'image/gif': 'gif',
          'image/svg': 'svg',
        };

        if (!mimeTypes[file.mimetype as TMime]) {
          error = new MulterError('LIMIT_FIELD_VALUE');
        }

        callback(error, tmpFolder);
      },
      filename: (request, file, callback) => {
        const hash = crypto.randomBytes(15).toString('hex');
        const filename = `${hash}-${file.originalname.replace(/\s/, '-')}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    disk: {
      paths: {
        tmpFolder,
        uploadsFolder: path.resolve(tmpFolder, 'uploads'),
      },
    },
    s3: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as StorageConfig;

export { storageConfig };
