import { Router } from 'express'
import { UserController } from './user.controller'

const router = Router()
const userController = new UserController()

router.post('/create', userController.createUser)

export const userRouter = router
