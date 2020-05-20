import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import UserController from '../controller/UsersController'
import UserAvatarController from '../controller/UserAvatarController'

const usersRouter = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)

usersRouter.post('/', userController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter
