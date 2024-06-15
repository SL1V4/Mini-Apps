import SearchPage from '@/ut_components/SearchPage/SearchPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Search'
}

export default function Home() {
	return <SearchPage />
}
