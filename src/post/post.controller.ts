import { Request, Response } from 'express'
import { PostService } from './post.service'

const postService = new PostService()

export class PostController {
	getAllPosts(_: Request, res: Response) {
		const posts = postService.getAllPosts()
		res.status(200).json(posts)
	}

	createPost(req: Request, res: Response) {
		const post = postService.createPost({ ...req.body })
		res.status(201).json(post)
	}
}
