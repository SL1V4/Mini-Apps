import { FC, PropsWithChildren, useContext } from 'react'

import { IPlaylist } from '@/types/playlist.infterface'
import { SongContext } from '../AppProvider/AppProvider'
import { useQuery } from '@tanstack/react-query'
import { PlaylistService } from '@/services/playlist/playlist.service'
import { IGlobalObject } from '@/types/global.type'

import Image from 'next/image'
import Link from 'next/link'
import PlayButton from '../PlayButton/PlayButton'

import './PlaylistCard.scss'

const PlaylistCard: FC<PropsWithChildren<IPlaylist>> = ({
	id,
	img = '/img/default.jpg',
	name
}) => {
	if (!id) return null

	const { globalState, setGlobalState } = useContext(SongContext)
	const { refetch } = useQuery({
		queryKey: [`plailist_${id}`],
		queryFn: () => PlaylistService.getById(id),
		enabled: false
	})

	async function onClick() {
		const { data } = await refetch()

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

	function isPause() {
		if (globalState?.isPause) {
			return true
		}

		return !(globalState?.currentPlaylist?.id === id)
	}

	return (
		<div className="playlist__card">
			<div className="playlist__card_img__wrap">
				<Link href={`/uta_pleasure/playlist/${id}`} title={name}>
					<Image
						className="playlist__card_img"
						priority={true}
						width={400}
						height={400}
						src={img}
						alt={name}
					/>
				</Link>

				<PlayButton isPause={isPause()} onClick={onClick} />
			</div>

			<div className="playlist__card_content">
				<Link href={`/uta_pleasure/playlist/${id}`} title={name}>
					<div className="playlist__card_title">{name}</div>
				</Link>
			</div>
		</div>
	)
}

export default PlaylistCard
