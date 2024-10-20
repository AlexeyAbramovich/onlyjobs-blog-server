import { config } from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import { postRouter } from './post/post.routes'
import { prisma } from './prisma'
import { userRouter } from './user/user.routes'

config()

const app = express()

async function main() {
	const port = process.env.PORT || 4200

	app.use(helmet())
	app.use(express.json())

	app.use('/posts', postRouter)
	app.use('/user', userRouter)

	app.use('*', (req: Request, res: Response) => {
		res.status(404).json({ error: `Not Found - ${req.originalUrl}` })
	})

	app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
		console.log(error.stack)
		res.status(500).json({ error: 'Something went wrong...' })
	})

	app.listen(port, () => {
		console.log(`Server is running on port ${port}`)
	})
}

main()
	.then(async () => {
		await prisma.$connect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
