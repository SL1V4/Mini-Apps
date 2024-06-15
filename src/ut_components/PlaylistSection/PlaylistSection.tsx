import { FC, PropsWithChildren } from 'react'
import { IPlaylist } from '@/types/playlist.infterface'
import PlaylistCard from '../PlaylistCard/PlaylistCard'

import './PlaylistSection.scss'

interface IPlaylistSection {
	playlists?: IPlaylist[]
	title?: string
}

const PlaylistSection: FC<PropsWithChildren<IPlaylistSection>> = ({
	playlists,
	title
}) => {
	return (
		<div className="playlist__section">
			{title && <h3 className="playlist__section_title">{title}</h3>}

			<div className="playlist__section_items">
				{playlists &&
					playlists.map(item => <PlaylistCard key={item.id} {...item} />)}
			</div>
		</div>
	)
}

export default PlaylistSection
