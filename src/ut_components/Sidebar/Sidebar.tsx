'use client'

import { FC, PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import HomeIcon from '@/icons/Home'
import SearchIcon from '@/icons/Search'

import SocialMedia from '@/components/SocialMedia/SocialMedia'
import LogoIcon from '@/icons/LogoIcon'

import './Sidebar.scss'

interface ISidebar {}
const menuArr = [
	{
		title: 'Home',
		href: '/uta_pleasure',
		icon: <HomeIcon />
	},
	{
		title: 'Search',
		href: '/uta_pleasure/search',
		icon: <SearchIcon />
	},
	{
		title: 'Main',
		href: '/',
		icon: <LogoIcon />
	}
]

const Sidebar: FC<PropsWithChildren<ISidebar>> = () => {
	const pathname = usePathname()

	return (
		<div className="sidebar">
			<nav>
				{menuArr.map((item, key) => (
					<Link
						key={key}
						href={item.href}
						className={`nav__item ${pathname === item.href ? 'active' : ''}`}
						title={item.title}
					>
						{item.icon}
						<span>{item.title}</span>
					</Link>
				))}
			</nav>

			<div className="sidebar__social">
				<div className="sidebar__social_title">Contact with me:</div>

				<SocialMedia />
			</div>
		</div>
	)
}

export default Sidebar
