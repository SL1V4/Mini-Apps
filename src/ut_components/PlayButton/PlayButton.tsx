import { FC, PropsWithChildren } from 'react'

import pauseIcon from './img/pause.svg'
import playIcon from './img/play.svg'

interface IPlayButton {
	isPause: boolean
	onClick?(): void
}

const PlayButton: FC<PropsWithChildren<IPlayButton>> = ({
	isPause,
	onClick = null
}) => {
	return (
		<button className="play__button" onClick={onClick}>
			{isPause ? (
				<img src={playIcon.src} alt="play" />
			) : (
				<img src={pauseIcon.src} alt="pause" />
			)}
		</button>
	)
}

export default PlayButton
