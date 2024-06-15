import { PlaylistService } from '@/services/playlist/playlist.service'
import { Metadata } from 'next'
import PlaylistDetail from '@/ut_components/PlaylistDetail/PlaylistDetail'

export async function generateMetadata({
	params
}: {
	params: { id: string }
}): Promise<Metadata> {
	const playlist = await PlaylistService.getMetadataById(+params.id)

	return {
		title: playlist.name
	}
}

export default function Home({ params }: { params: { id: string } }) {
	return <PlaylistDetail id={+params.id} />
}
