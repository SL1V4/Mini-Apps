'use client'

import { SongService } from '@/services/song/song.service'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'

import { ISong } from '@/types/song.interface'
import { SongContext } from '../AppProvider/AppProvider'
import SongItem from '../SongItem/SongItem'
import { IGlobalObject } from '@/types/global.type'
import { formatSongTime } from '@/api/helper'

import './SearchPage.scss'

const SearchPage = () => {
	const { globalState, setGlobalState } = useContext(SongContext)

	const [searchQuery, setSearchQuery] = useState<string>()
	const [searchSongs, setSearchState] = useState<ISong[]>()

	const { refetch } = useQuery({
		queryKey: ['search'],
		queryFn: () => SongService.searchByName(searchQuery)
	})

	useEffect(() => {
		if (!searchSongs) {
			return
		}

		searchSongs.map(item => {
			const audio = new Audio(item.url)

			audio.addEventListener('loadeddata', () => {
				document.getElementById(`song__${item.id}`).textContent =
					formatSongTime(audio.duration)
			})
		})
	}, [searchSongs])

	async function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		const refetchResult = await refetch()
		const data = refetchResult.data as ISong[]

		if (data) {
			setSearchState(data)
		}
	}

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchQuery(e.target.value)

		if (!e.target.value) {
			setSearchState(null)
		}
	}

	function setSong(song: ISong) {
		if (song && song.url) {
			setGlobalState((prev: IGlobalObject) => ({
				...prev,
				currentPlaylist: null,
				currentSong: song,
				isPause:
					prev?.currentSong?.id === song.id ? !prev.isPause : prev.isPause
			}))
		}
	}

	function isPause(id: number) {
		if (globalState?.isPause) {
			return true
		}

		return !(globalState?.currentSong?.id === id)
	}

	return (
		<div className="search">
			<h1 className="search__title">Search</h1>

			<form onSubmit={onSubmit}>
				<input
					className="search__input"
					type="text"
					placeholder="Search"
					name="search"
					onChange={onChange}
				/>

				<input
					className="search__input_submit ut__button"
					type="submit"
					value="Search"
				/>
			</form>

			<div className="search__content">
				{searchSongs?.length > 0 && (
					<div className="search__title">
						{`${searchSongs.length} songs was found:`}
					</div>
				)}

				<div className="search__content_songs">
					{searchSongs?.length > 0 &&
						searchSongs.map((item, index) => {
							const songProps = {
								item: item,
								index: index,
								isCurrentSong: globalState?.currentSong?.id === item.id,
								isPause: isPause(item.id),
								setSong: () => setSong(item)
							}

							return <SongItem {...songProps} key={item.id} />
						})}
				</div>
			</div>
		</div>
	)
}

export default SearchPage
