import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { userValidation } from './user.validation'

const userService = new UserService()

export class UserController {
	async createUser(req: Request, res: Response) {
		try {
			if (req.body?.email) {
				const validation = await userValidation.safeParseAsync(req.body)

				if (!validation.success) {
					res.status(400).json({
						error: validation.error?.errors[0].message,
					})
					return
				}

				const user = await userService.createUser(req.body.email)
				res.status(201).json(user)
			} else {
				res.status(400).json({ error: `Email can't be empty!` })
			}
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				res
					.status(400)
					.json({ error: `User with email ${req.body.email} already exists!` })
				return
			}
			res.status(500).json(error)
		}
	}

	async checkUser(req: Request, res: Response) {
		try {
			if (req.body?.email) {
				const validation = await userValidation.safeParseAsync(req.body)

				if (!validation.success) {
					res.status(400).json({
						error: validation.error?.errors[0].message,
					})
					return
				}

				const user = await userService.checkUser(req.body.email)
				if (user) {
					res.status(200).json({
						error: `User with email ${req.body.email} already exists!`,
					})
					return
				} else {
					res.status(200).json({
						error: `User with email ${req.body.email} does not exists!`,
					})
				}
			} else {
				res.status(400).json({ error: `Email can't be empty!` })
			}
		} catch (error) {
			res.status(500).json(error)
		}
	}
}
