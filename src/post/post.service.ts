import { prisma } from '@/prisma'
import { Post } from '@prisma/client'

export class PostService {
	async getAllPosts(): Promise<Post[]> {
		return await prisma.post.findMany()
	}

	async getPostByUrl(url: string): Promise<Post | null> {
		return await prisma.post.findFirst({
			where: {
				title: url.split('-').join(' '),
			},
		})
	}
}
