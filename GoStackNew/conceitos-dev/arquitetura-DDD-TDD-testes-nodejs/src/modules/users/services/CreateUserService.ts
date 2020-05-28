import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IProviderEncryptedPassword from '../providers/ProvideEncryptedPassword/models/IProviderEncryptedPassword';

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

    return user;
  }
}

export default CreateUserService;
