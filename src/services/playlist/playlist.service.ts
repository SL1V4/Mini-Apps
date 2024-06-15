import { createInstance, createServerInstance } from '@/api/api-instance'
import { IPlaylist } from '@/types/playlist.infterface'

export const PlaylistService = {
	async getAll(page: number = 1) {
		return createInstance<IPlaylist[]>({
			url: '/playlist',
			method: 'get',
			data: {
				page: +page
			}
		})
	},

	async getById(id: number) {
		if (!id) {
			return null
		}

		return createInstance<IPlaylist>({
			url: `/playlist/by-id/${id}`,
			method: 'get'
		})
	},

	async getMetadataById(id: number) {
		if (!id) {
			return null
		}

		return createServerInstance<IPlaylist>({
			url: `/playlist/metadata/by-id/${id}`,
			method: 'get'
		})
	}
}
