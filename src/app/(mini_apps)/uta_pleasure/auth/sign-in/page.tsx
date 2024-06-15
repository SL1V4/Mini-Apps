import { Metadata } from 'next'
import SingIn from '@/ut_components/Auth/SignIn'

export const metadata: Metadata = {
	title: 'Sign In'
}

export default function Home() {
	return <SingIn />
}
