import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const clientApiInstance = axios.create({
	baseURL: '/api',
	headers: { 'Content-Type': 'application/json' }
})

export const serverApiInstance = axios.create({
	baseURL: process.env.SERVER_URL,
	headers: { 'Content-Type': 'application/json' }
})

export const fileApiInstance = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'multipart/form-data'
	}
})

export const createInstance = async <T>(
	config: AxiosRequestConfig,
	options?: AxiosError
): Promise<T> => {
	return clientApiInstance({
		...config,
		...options
	}).then(r => r.data)
}

export const createServerInstance = async <T>(
	config: AxiosRequestConfig,
	options?: AxiosError
): Promise<T> => {
	return serverApiInstance({
		...config,
		...options
	}).then(r => r.data)
}

export const createFileInstance = async <T>(
	config: AxiosRequestConfig,
	options?: AxiosError
): Promise<T> => {
	return fileApiInstance({
		...config,
		...options
	}).then(r => r.data)
}
