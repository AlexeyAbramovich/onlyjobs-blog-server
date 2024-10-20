import { config } from 'dotenv'
import express from 'express'
import { postRouter } from './post/post.routes'
import { userRouter } from './user/user.routes'

config()

const app = express()

async function main() {
	app.use(express.json())

	app.use('/posts', postRouter)
	app.use('/user', userRouter)

	app.use('*', (_, res) => {
		res.status(404).json({ message: 'Not Found' })
	})

	app.listen(process.env.PORT, () => {
		console.log('Server is running on port 4200')
	})
}

main()
