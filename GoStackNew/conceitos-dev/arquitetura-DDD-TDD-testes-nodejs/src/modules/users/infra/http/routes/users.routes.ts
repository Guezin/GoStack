import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body
  const userRepository = new UserRepository()
  const createUser = new CreateUserService(userRepository)
  const user = await createUser.execute({
    name,
    email,
    password
  })

  delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const userRepository = new UserRepository()
    const updateUserAvatar = new UpdateUserAvatarService(userRepository)
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)
  }
)

export default usersRouter
