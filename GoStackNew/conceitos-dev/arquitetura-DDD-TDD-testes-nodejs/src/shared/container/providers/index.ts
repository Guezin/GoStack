import { container } from 'tsyringe';

import IStorageProvider from './StorageProvader/models/IStorageProvider';
import DiskStorageProvider from './StorageProvader/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
