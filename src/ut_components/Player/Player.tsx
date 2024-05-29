import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import backArrow from './img/arrow.svg'

import randomIcon from './img/random_mode.svg'
import backIcon from './img/back.svg'
import pauseIcon from './img/pause.svg'
import playIcon from './img/play.svg'
import nextIcon from './img/next.svg'
import repeatIcon from './img/repeat.svg'
import Like from '@/icons/Like'

import './Player.scss'

interface ISong {
	url: string
	name: string

	author?: string
	img?: string
}

interface ISongState {
	isPause: boolean
	progress: number
	stopUpdatedBar: boolean

	currentDuration?: number
	currentDurationFormated?: string
	duration?: number
	durationFormated?: string
}

const Player: FC<PropsWithChildren<ISong>> = ({
	url,
	name = 'unknown',
	author = 'unknown',
	img
}) => {
	const songRef = useRef<HTMLAudioElement>(null)
	const playerBarRef = useRef<HTMLInputElement>(null)
	const [songState, setSongState] = useState<ISongState>({
		isPause: true,
		progress: 0,
		stopUpdatedBar: false
	})

	useEffect(() => {
		setSongState(prev => {
			if (playerBarRef) {
				playerBarRef.current.value = '0'
			}

			const currentSeconds = Math.floor(songRef.current.duration)

			return {
				...prev,
				currentDurationFormated: '00:00',
				duration: currentSeconds,
				durationFormated: formatSongTime(currentSeconds)
			}
		})
	}, [url])

	function getSongPersent(duration: number, currentDuration: number): number {
		if (!duration || !currentDuration) {
			return 0
		}

		return (100 / duration) * currentDuration
	}

	function formatSongTime(secondsDuration: number): string {
		if (isNaN(secondsDuration)) {
			return '--:--'
		}

		const [min, seconds] = [
			Math.floor(secondsDuration / 60)
				.toString()
				.padStart(2, '0'),
			(secondsDuration % 60).toString().padStart(2, '0')
		]

		return `${min}:${seconds}`
	}

	function playOrPause() {
		const song = songRef.current

		if (song === null) {
			return
		}

		setSongState(prev => ({ ...prev, isPause: !prev.isPause }))
		songState.isPause ? song.play() : song.pause()
	}

	function onEnded() {
		setSongState(prev => ({ ...prev, isPause: true }))
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

	function onClickOrTouch(
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

			setSongState(prev => {
				return {
					...prev,
					stopUpdatedBar: true,

					currentDuration: currentSeconds,
					currentDurationFormated: formatSongTime(Math.floor(currentSeconds)),
					progress: getSongPersent(prev.duration, +e.target.value)
				}
			})
		}
	}

	return (
		<div className="player">
			<div className="player__top">
				<button className="player__top_back">
					<Image src={backArrow.src} width={18} height={18} alt={'back'} />
				</button>

				<div className="player__song_title">{name}</div>
			</div>

			<div className="player__img">
				<Image
					style={{
						width: '100%',
						height: '260px'
					}}
					width={800}
					height={800}
					src={img}
					alt={name}
				/>
			</div>

			<div className="player__controls_block">
				<div className="player__song_content">
					<div>
						<div className="player__song_title">{name}</div>
						<div className="player__song_author">{author}</div>
					</div>

					<button className="player__controls_like">
						<Like />
					</button>
				</div>

				<div className="player__bar_block">
					<div className="player__bar_block__audio">
						<audio
							onEnded={onEnded}
							onTimeUpdate={updateBar}
							ref={songRef}
							src={url}
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
						<input
							className="player__bar_stripe"
							type="range"
							min="0"
							max={songState.duration ? songState.duration : 100}
							ref={playerBarRef}
							onClick={onClickOrTouch}
							onTouchEnd={onClickOrTouch}
							onChange={onGrab}
						/>
					</div>

					<div className="player__bar_time">
						<div className="player__bar_current__duration">
							{songState.currentDurationFormated
								? songState.currentDurationFormated
								: '--:--'}
						</div>
						<div className="player__bar_duration">
							{songState.durationFormated
								? songState.durationFormated
								: '--:--'}
						</div>
					</div>
				</div>

				<div className="player__controls_buttons">
					<button className="player__controls_shuffle">
						<Image src={randomIcon.src} width={18} height={18} alt={'random'} />
					</button>
					<button className="player__controls_back">
						<Image src={backIcon.src} width={18} height={18} alt={'back'} />
					</button>

					<button className="player__controls_play" onClick={playOrPause}>
						{songState.isPause ? (
							<Image src={playIcon.src} width={18} height={18} alt={'play'} />
						) : (
							<Image src={pauseIcon.src} width={18} height={18} alt={'pause'} />
						)}
					</button>

					<button className="player__controls_back">
						<Image src={nextIcon.src} width={18} height={18} alt={'next'} />
					</button>
					<button className="player__controls_repeat">
						<Image src={repeatIcon.src} width={18} height={18} alt={'repeat'} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Player
