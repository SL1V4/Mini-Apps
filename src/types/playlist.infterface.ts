import { ISong } from './song.interface'

export interface IPlaylist {
	id: number
	name: string
	userId: number
	songs: ISong[]
	img: string
}
