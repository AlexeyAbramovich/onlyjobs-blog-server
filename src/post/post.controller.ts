import { Request, Response } from 'express'
import { PostService } from './post.service'

const postService = new PostService()

export class PostController {
	async getAllPosts(_: Request, res: Response) {
		try {
			const posts = await postService.getAllPosts()
			res.status(200).json(posts)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	async getPostByUrl(req: Request, res: Response) {
		try {
			const post = await postService.getPostByUrl(req.params.url)

			if (!post) {
				res.status(404).json({ error: 'Post not found!' })
				return
			}

			res.status(200).json(post)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}
