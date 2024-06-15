import { createInstance } from '@/api/api-instance'
import { ISign } from '@/types/user.interface'

export const AuthService = {
	async signUp(data: ISign) {
		return createInstance({
			url: '/auth/sign-up',
			method: 'post',
			data: {
				email: data.email,
				password: data.password
			}
		})
	},

	async signIn(data: ISign) {
		return createInstance({
			url: '/auth/sign-in',
			method: 'post',
			data: {
				email: data.email,
				password: data.password
			}
		})
	},

	async signOut() {
		return createInstance({
			url: '/auth/sign-out',
			method: 'post'
		})
	},

	async getSessionInfo() {
		return createInstance({
			url: '/auth/session',
			method: 'get'
		})
	}
}

export default AuthService
