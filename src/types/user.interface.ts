export interface IUser {
	id: number
	email: string
	name?: string
	avatarPath?: string
}

export interface ISign {
	email: string
	password: string
}

export interface IUserState {
	id?: number
	email?: string
	name?: string
	avatarPath?: string
	isLoading?: boolean
}

export interface IEditProfile {
	avatarPath?: string
	name?: string
}

export interface IEditProfileRequest {
	body: {
		name: string
		photoEvent: string
	}
	avatar: File
}
