import type { Metadata } from 'next'
import ReactDOM from 'react-dom/client'
import { Exo_2 } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Uta Pleasure',
	description: 'Music App'
}

const exo2 = Exo_2({
	subsets: ['cyrillic'],
	weight: '400',
	variable: '--exo2'
})

export default function UtaPleasureLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ru">
			<body className={exo2.variable}>{children}</body>
		</html>
	)
}
