import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IProviderEncryptedPassword from '../providers/ProvideEncryptedPassword/models/IProviderEncryptedPassword';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  private userRepository: IUsersRepository;
  private encryptedPassword: IProviderEncryptedPassword;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,

    @inject('ProviderEncryptedPassword')
    encryptedPassword: IProviderEncryptedPassword,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    this.userRepository = userRepository;
    this.encryptedPassword = encryptedPassword;
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.', 401);
    }

    const hashedPassword = await this.encryptedPassword.generateHash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
