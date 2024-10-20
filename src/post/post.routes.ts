import { Router } from 'express'
import { PostController } from './post.controller'

const router = Router()
const postController = new PostController()

router.get('/', postController.getAllPosts)

router.get('/:url', postController.getPostByUrl)

export const postRouter = router
