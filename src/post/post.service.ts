export class PostService {
	getAllPosts() {
		return ['Post1', 'Post2', 'Post3', 'Post4', 'Post5']
	}

	createPost(body: any) {
		return `New Post ${body.name}`
	}
}
