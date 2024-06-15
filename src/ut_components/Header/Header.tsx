'use client'

import { UserContext } from '../AppProvider/CheckSession'
import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SignOut from '../Auth/SignOut'

import './Header.scss'

const Header = () => {
	const { userState } = useContext(UserContext)

	return (
		<header>
			{!userState.isLoading && userState?.id ? (
				<>
					<SignOut />

					<Link href="/uta_pleasure/profile" title="User profile">
						<div className="user">
							<Image
								priority={true}
								width={50}
								height={50}
								alt="user"
								src={
									userState?.avatarPath
										? userState.avatarPath
										: '/img/user_default.png'
								}
							/>
						</div>
					</Link>
				</>
			) : (
				<>
					<Link
						href="/uta_pleasure/auth/sign-in"
						className="ut__button"
						title="Sing In"
					>
						Sing In
					</Link>
					<Link
						href="/uta_pleasure/auth/sign-up"
						className="ut__button"
						title="	Sign Up"
					>
						Sign Up
					</Link>
				</>
			)}
		</header>
	)
}

export default Header
