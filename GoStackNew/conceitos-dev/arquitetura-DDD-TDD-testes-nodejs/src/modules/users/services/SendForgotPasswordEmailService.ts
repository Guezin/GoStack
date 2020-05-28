import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Recuperação de senha solicitado!');
  }
}

export default SendForgotPasswordEmailService;
