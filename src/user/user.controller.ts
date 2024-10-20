import { Request, Response } from 'express'
import { UserService } from './user.service'

const userService = new UserService()

export class UserController {
	createUser(req: Request, res: Response) {
		const user = userService.createUser(req.body.email)
		res.status(201).json(user)
	}
}
