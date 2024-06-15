import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import { AppProvider } from '@/ut_components/AppProvider/AppProvider'
import Sidebar from '@/ut_components/Sidebar/Sidebar'
import Header from '@/ut_components/Header/Header'
import PlayerBottom from '@/ut_components/Player/PlayerBottom'
import NextTopLoader from 'nextjs-toploader'
import Footer from '@/components/Footer/Footer'

import './style.scss'

export const metadata: Metadata = {
	title: 'Uta Pleasure',
	description: 'Music App'
}

const exo2 = Exo_2({
	subsets: ['cyrillic'],
	weight: '400',
	variable: '--exo2'
})

export default function UtaPleasureAuthLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ru">
			<body className={exo2.variable}>
				<AppProvider>
					<NextTopLoader
						color="#e91a5b"
						height={2}
						showSpinner={false}
						easing="ease"
					/>
					<div className="content">
						<Sidebar />
						<div className="main">
							<Header />
							<main>{children}</main>
							<Footer />
						</div>

						<PlayerBottom />
					</div>
				</AppProvider>
			</body>
		</html>
	)
}
