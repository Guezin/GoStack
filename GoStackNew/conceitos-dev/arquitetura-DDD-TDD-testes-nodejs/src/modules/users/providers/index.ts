import { container } from 'tsyringe';

import IProviderEncryptedPassword from './ProvideEncryptedPassword/models/IProviderEncryptedPassword';
import BCryptHash from './ProvideEncryptedPassword/implementations/BCryptHash';

container.registerSingleton<IProviderEncryptedPassword>(
  'ProviderEncryptedPassword',
  BCryptHash,
);
