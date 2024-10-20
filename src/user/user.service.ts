import { prisma } from '@/prisma'

export class UserService {
	async createUser(email: string) {
		return prisma.user.create({
			data: {
				email,
			},
		})
	}

	checkUser(email: string) {
		return prisma.user.findFirst({
			where: {
				email,
			},
		})
	}
}
