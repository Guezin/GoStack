import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUsersRepository';
import IProviderEncryptedPassword from '../providers/ProvideEncryptedPassword/models/IProviderEncryptedPassword';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('ProviderEncryptedPassword')
    private encryptedPassword: IProviderEncryptedPassword,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.encryptedPassword.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
    }

    if (password) {
      user.password = await this.encryptedPassword.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return await this.userRepository.save(user);
  }
}

export default UpdateProfile;
