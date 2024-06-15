import { Metadata } from 'next'
import Profile from '@/ut_components/Profile/Profile'

export const metadata: Metadata = {
	title: 'Profile'
}
export default function Home() {
	return <Profile />
}
