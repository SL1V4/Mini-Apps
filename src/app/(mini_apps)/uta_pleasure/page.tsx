'use client'

import Player from '@/ut_components/Player/Player'
import './style.scss'

export default function Home() {
	const song = {
		name: 'Seiza ni naretara',
		author: 'Kita Kita',
		url: '/songs/song.ogg',
		img: '/img/seiza.jpg'
	}

	return (
		<main>
			<Player {...song} />
		</main>
	)
}
