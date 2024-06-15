'use client'

import { PlaylistService } from '@/services/playlist/playlist.service'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { SongContext } from '../AppProvider/AppProvider'
import { IGlobalObject } from '@/types/global.type'
import { formatSongTime } from '@/api/helper'
import { ISong } from '@/types/song.interface'
import SongItem from '../SongItem/SongItem'

import Image from 'next/image'
import PlayButton from '../PlayButton/PlayButton'
import durationIcon from './img/duration.svg'

import './PlaylistDetail.scss'

const PlaylistDetail = ({ id }: { id: number }) => {
	const { globalState, setGlobalState } = useContext(SongContext)
	const { data } = useQuery({
		queryKey: [`playlist_detail_${id}`],
		queryFn: () => PlaylistService.getById(+id)
	})
	const { name = 'unknown', img = '/img/default.jpg' } = { ...data }

	useEffect(() => {
		if (!data?.songs) {
			return
		}

		data.songs.map(item => {
			const audio = new Audio(item.url)

			audio.addEventListener('loadeddata', () => {
				document.getElementById(`song__${item.id}`).textContent =
					formatSongTime(audio.duration)
			})
		})
	}, [data?.songs])

	function playPlaylist() {
		if (globalState?.currentPlaylist?.id === id) {
			return setGlobalState((prev: IGlobalObject) => ({
				...prev,
				isPause: !prev.isPause
			}))
		}

		if (data?.songs.length && data.songs[0].url) {
			setGlobalState((prev: IGlobalObject) => ({
				...prev,
				currentPlaylist: data,
				currentSong: data.songs[0],
				isPause:
					globalState?.currentPlaylist?.id === id ? !prev.isPause : prev.isPause
			}))
		}
	}

	function setSong(song: ISong) {
		if (song && song.url) {
			setGlobalState((prev: IGlobalObject) => ({
				...prev,
				currentPlaylist: data,
				currentSong: song,
				isPause: prev?.currentPlaylist?.id === id ? !prev.isPause : prev.isPause
			}))
		}
	}

	function isPause(type: string, id: number) {
		if (globalState?.isPause) {
			return true
		}

		switch (type) {
			case 'song':
				return !(globalState?.currentSong?.id === id)
			case 'playlist':
				return !(globalState?.currentPlaylist?.id === id)

			default:
				false
		}
	}

	if (!data) {
		return null
	}

	return (
		<div className="playlist__detail">
			<div className="playlist__header">
				<div className="playlist__img">
					<Image
						className="playlist__card_img"
						style={{
							width: 300,
							height: 300
						}}
						priority={true}
						width={300}
						height={300}
						src={img}
						alt={name}
					/>
				</div>
				<div className="playlist__header_content">
					<h1 className="playlist__suptitle">Playlist</h1>
					<h3 className="playlist__title">{name}</h3>
				</div>
			</div>
			<div className="playlist__content">
				<div className="playlist__controls">
					<PlayButton
						isPause={isPause('playlist', id)}
						onClick={playPlaylist}
					/>
				</div>

				<div className="playlist__songs">
					<div className="playlist__songs_head">
						<div>#</div>
						<div>Name</div>
						<div>Date added</div>
						<div className="playlist__song_duration">
							<img src={durationIcon.src} alt="duration" />
						</div>
					</div>

					<div className="playlist__songs_items">
						{data?.songs &&
							data.songs.map((item, index) => {
								const songProps = {
									item: item,
									index: index,
									isCurrentSong: globalState?.currentSong?.id === item.id,
									isPause: isPause('song', item.id),
									setSong: () => setSong(item)
								}

								return <SongItem {...songProps} key={item.id} />
							})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlaylistDetail
