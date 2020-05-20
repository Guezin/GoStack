import { getRepository, Repository } from 'typeorm'

import User from '../entities/User'

import ICreateUserDTO from '@modules/users/infra/dtos/ICreateUserDTO'

class UserRepository {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = getRepository(User)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email }
    })

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id)

    return user
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create(userData)

    await this.userRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
}

export default UserRepository
