import { createInstance } from '@/api/api-instance'
import { ISong } from '@/types/song.interface'

export const SongService = {
	async getById(id: number | string) {
		return createInstance<ISong>({
			url: `/song/by-id/${id}`,
			method: 'get'
		})
	},

	async searchByName(query: string) {
		return createInstance({
			url: `/song/by-query/${query}`,
			method: 'get'
		})
	}
}
