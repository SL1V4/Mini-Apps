import { createFileInstance } from '@/api/api-instance'
import { IEditProfileRequest } from '@/types/user.interface'

export const UserService = {
	async update(data: IEditProfileRequest) {
		return createFileInstance({
			url: '/users',
			method: 'put',
			data: data
		})
	}
}

export default UserService
