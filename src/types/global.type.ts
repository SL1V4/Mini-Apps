import { IPlaylist } from './playlist.infterface'
import { ISong } from './song.interface'

export type IGlobalObject = {
	currentSong?: ISong
	currentPlaylist?: IPlaylist
	isPause: boolean
	repeat: boolean
	random: boolean
}
