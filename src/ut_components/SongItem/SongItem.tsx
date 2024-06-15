import { ISong } from '@/types/song.interface'
import { FC, PropsWithChildren } from 'react'
import PlayButton from '../PlayButton/PlayButton'

import './SongItem.scss'

interface ISongProps {
	item: ISong
	index: number
	isCurrentSong: boolean
	isPause: boolean
	setSong(): void
}

const SongItem: FC<PropsWithChildren<ISongProps>> = ({
	item,
	index,
	isCurrentSong,
	isPause,
	setSong
}) => {
	return (
		<div
			className={`song ${isCurrentSong ? 'active' : ''}`}
			onDoubleClick={setSong}
		>
			<div className="song__play_button">
				<span>{isPause ? index + 1 : <div className="equaliser"></div>}</span>

				<PlayButton isPause={isPause} onClick={setSong} />
			</div>
			<div className="song__info">
				<div className="song__img">
					{item?.img ? (
						<img src={item.img} alt={item.name} />
					) : (
						<img src={'/img/default.jpg'} alt={item.name} />
					)}
				</div>
				<div className="song__info_content">
					<div className="song__name">{item.name}</div>
					{item?.author && <div className="song__author">{item.author}</div>}
				</div>
			</div>
			<div>
				{item.createdAt && new Date(item.createdAt).toLocaleDateString()}
			</div>
			<div id={`song__${item.id}`} className="song__duration">
				--:--
			</div>
		</div>
	)
}

export default SongItem
