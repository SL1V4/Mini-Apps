'use client'

import { useQuery } from '@tanstack/react-query'
import { PlaylistService } from '@/services/playlist/playlist.service'
import PlaylistSection from '@/ut_components/PlaylistSection/PlaylistSection'
import PlaylistSectionLoading from '@/ut_components/PlaylistSection/PlaylistSectionLoading'

export default function Home() {
	const { data } = useQuery({
		queryKey: ['main'],
		queryFn: () => PlaylistService.getAll()
	})

	return (
		<>
			{!data ? (
				<PlaylistSectionLoading />
			) : (
				<PlaylistSection playlists={data} title="Something new" />
			)}
		</>
	)
}
