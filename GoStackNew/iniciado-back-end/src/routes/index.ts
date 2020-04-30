import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/appointments', ensureAuthenticated, appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
