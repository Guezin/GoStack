import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import AppError from '@shared/errors/AppError'

import authConfig from '@config/auth'

import User from '@modules/users/infra/typeorm/entities/User'

import IUserRepository from '../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateSessionService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default CreateSessionService
