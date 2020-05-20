import User from '../infra/typeorm/entities/User'

import ICreateUserDTO from '@modules/users/infra/dtos/ICreateUserDTO'

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(userData: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
