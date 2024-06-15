'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { SongContext } from '../AppProvider/AppProvider'
import { IGlobalObject } from '@/types/global.type'
import { ISong } from '@/types/song.interface'
import { formatSongTime } from '@/api/helper'

import Image from 'next/image'
import randomIcon from './img/random.svg'
import randomOnIcon from './img/random_on.svg'
import backIcon from './img/back.svg'
import nextIcon from './img/next.svg'
import repeatIcon from './img/repeat.svg'
import repeatOnIcon from './img/repeat_on.svg'
import PlayButton from '../PlayButton/PlayButton'

import './PlayerBottom.scss'

interface ISongState {
	progress: number
	stopUpdatedBar: boolean

	currentDuration?: number
	currentDurationFormated?: string
	duration?: number
	durationFormated?: string
}

const PlayerBottom = () => {
	const songRef = useRef<HTMLAudioElement>(null)
	const playerBarRef = useRef<HTMLInputElement>(null)

	const [songState, setSongState] = useState<ISongState>({
		progress: 0,
		stopUpdatedBar: false,
		currentDurationFormated: '00:00'
	})

	const { globalState, setGlobalState } = useContext(SongContext)
	const {
		url = null,
		name = 'unknown',
		author = 'unknown',
		img = '/img/default.jpg'
	} = { ...globalState?.currentSong }

	//Calling after the global variable "globalState.isPause" was changed
	useEffect(() => playOrPause('useEffect'), [globalState.isPause])

	if (!url) {
		return null
	}

	function setBaseSongSettings() {
		setSongState(prev => {
			if (playerBarRef.current) {
				playerBarRef.current.value = '0'
			}

			const currentSeconds = Math.floor(songRef.current.duration)

			return {
				...prev,
				duration: currentSeconds,
				durationFormated: formatSongTime(currentSeconds)
			}
		})

		setGlobalState((prev: IGlobalObject) => ({
			...prev,
			isPause: false
		}))
	}

	function playOrPause(type: string = 'click') {
		if (type === 'useEffect') {
			const song = songRef.current

			if (!song) {
				return
			}

			globalState.isPause ? song.pause() : song.play()
		} else {
			setGlobalState((prev: IGlobalObject) => ({
				...prev,
				isPause: !prev.isPause
			}))
		}
	}

	function updateBar(e: React.ChangeEvent<HTMLAudioElement>) {
		setSongState(prev => {
			const currentSeconds = Math.floor(e.target.currentTime)

			if (!prev.stopUpdatedBar) {
				prev = {
					...prev,
					progress: getSongPersent(prev.duration, currentSeconds),
					currentDurationFormated: formatSongTime(Math.floor(currentSeconds))
				}
				playerBarRef.current.value = currentSeconds.toString()
			}

			return {
				...prev,
				currentDuration: currentSeconds
			}
		})
	}

	function onClick(
		e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>
	) {
		const inputValue = (e.target as HTMLInputElement).value

		if (!isNaN(songState.duration) && inputValue) {
			songRef.current.currentTime = +inputValue
			setSongState(prev => ({ ...prev, stopUpdatedBar: false }))
		}
	}

	function onGrab(e: React.ChangeEvent<HTMLInputElement>) {
		if (!isNaN(songState.duration)) {
			const currentSeconds = +e.target.value

			setSongState(prev => ({
				...prev,
				stopUpdatedBar: true,

				currentDuration: currentSeconds,
				currentDurationFormated: formatSongTime(Math.floor(currentSeconds)),
				progress: getSongPersent(prev.duration, +e.target.value)
			}))
		}
	}

	function changeSong(switcher: string) {
		const playlist = globalState?.currentPlaylist?.songs

		if (!Array.isArray(playlist)) {
			return
		}

		let curSongKey = findSongIndexById(globalState?.currentSong?.id, playlist)

		if (curSongKey !== false) {
			let songIndex = 0

			if (switcher === 'back') {
				//set duration 0 to current song
				if (songState.progress > 10 && songRef.current) {
					songRef.current.currentTime = 0

					return setSongState(prev => ({
						...prev,
						currentDuration: 0,
						currentDurationFormated: formatSongTime(Math.floor(0)),
						progress: getSongPersent(prev.duration, 0)
					}))
				}

				songIndex = curSongKey === 0 ? playlist.length - 1 : curSongKey - 1
			}

			if (switcher === 'next') {
				songIndex = curSongKey === playlist.length - 1 ? 0 : curSongKey + 1
			}

			setGlobalState((prev: IGlobalObject) => {
				return {
					...prev,
					currentSong: prev.currentPlaylist.songs[songIndex]
				}
			})
		}
	}

	function findSongIndexById(songId: number, playlist: ISong[]) {
		if (!songId || playlist.length < 1) {
			return false
		}

		return playlist.findIndex(item => item.id === globalState?.currentSong?.id)
	}

	function setRandom() {
		setGlobalState((prev: IGlobalObject) => {
			let playlist = globalState?.currentPlaylist?.songs

			if (!Array.isArray(playlist)) {
				return
			}

			if (!prev.random) {
				playlist = playlist.toSorted(item =>
					globalState?.currentSong?.id === item.id ? 0 : Math.random() - 0.5
				)
			} else {
				playlist = playlist.toSorted((song1, song2) =>
					song1.name > song2.name ? 1 : -1
				)
			}

			return {
				...prev,
				random: !prev.random,
				currentPlaylist: {
					...prev.currentPlaylist,
					songs: playlist
				}
			}
		})
	}

	function setRepeat() {
		setGlobalState((prev: IGlobalObject) => ({
			...prev,
			repeat: !prev.repeat
		}))
	}

	function onEnded() {
		if (globalState.repeat) {
			return
		}

		const playlist = globalState?.currentPlaylist?.songs

		if (Array.isArray(playlist) && playlist.length > 1) {
			changeSong('next')
		} else {
			playOrPause()
		}
	}

	function getSongPersent(duration: number, currentDuration: number): number {
		if (!duration || !currentDuration) {
			return 0
		}

		return (100 / duration) * currentDuration
	}

	return (
		<div className="player">
			<div className="player__left">
				<div className="player__img">
					<Image
						style={{
							width: '56px',
							height: '56px'
						}}
						priority={true}
						width={100}
						height={100}
						src={img ? img : '/img/default.jpg'}
						alt={name}
					/>
				</div>
				<div className="player__left_content">
					<div className="player__song_title">{name}</div>
					<div className="player__song_author">{author}</div>
				</div>
			</div>

			<div className="player__controls_block">
				<div className="player__controls_buttons">
					<button
						className="player__controls_button random"
						onClick={setRandom}
					>
						{globalState.random ? (
							<img src={randomOnIcon.src} alt="random_on" />
						) : (
							<img src={randomIcon.src} alt="random" />
						)}
					</button>
					<button
						className="player__controls_button back"
						onClick={() => changeSong('back')}
					>
						<img src={backIcon.src} alt="back" />
					</button>

					<PlayButton isPause={globalState.isPause} onClick={playOrPause} />

					<button
						className="player__controls_button next"
						onClick={() => changeSong('next')}
					>
						<img src={nextIcon.src} alt="next" />
					</button>
					<button
						className="player__controls_button repeat"
						onClick={setRepeat}
					>
						{globalState.repeat ? (
							<img src={repeatOnIcon.src} alt="repeat_on" />
						) : (
							<img src={repeatIcon.src} alt="repeat" />
						)}
					</button>
				</div>

				<div className="player__bar_block">
					<div className="player__bar_block__audio">
						<audio
							onEnded={onEnded}
							onTimeUpdate={updateBar}
							ref={songRef}
							src={url}
							onLoadedMetadata={setBaseSongSettings}
							autoPlay={true}
							loop={globalState.repeat}
						></audio>
					</div>

					<div
						style={
							{
								'--progress-bar-position': `${songState.progress}%`
							} as React.CSSProperties
						}
						className="player__bar"
					>
						<div className="player__bar_current__duration">
							{songState.currentDurationFormated
								? songState.currentDurationFormated
								: '--:--'}
						</div>
						<input
							className="player__bar_stripe"
							type="range"
							min="0"
							max={songState.duration ? songState.duration : 100}
							ref={playerBarRef}
							onClick={onClick}
							onChange={onGrab}
						/>
						<div className="player__bar_duration">
							{songState.durationFormated
								? songState.durationFormated
								: '--:--'}
						</div>
					</div>

					<div className="player__bar_time"></div>
				</div>
			</div>

			<div className="player__right">{/* add change volume */}</div>
		</div>
	)
}

export default PlayerBottom
