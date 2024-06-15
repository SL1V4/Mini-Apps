import SingUp from '@/ut_components/Auth/SignUp'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Sign Up'
}

export default function Home() {
	return <SingUp />
}
