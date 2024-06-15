'use client'

import { UserContext } from '../AppProvider/CheckSession'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Popup from '../Popup/Popup'
import ProfileEditForm from '../ProfileEditForm/ProfileEditForm'
import Image from 'next/image'

import './Profile.scss'

const Profile = () => {
	const rounter = useRouter()

	const { userState } = useContext(UserContext)
	const [isActive, setActive] = useState(false)

	if (userState?.isLoading) {
		return null
	}

	if (!userState?.id) {
		rounter.push('/uta_pleasure/auth/sign-in')
	}

	return (
		<div className="profile__detail">
			<div className="profile">
				<div className="profile__img" onClick={() => setActive(true)}>
					<Image
						className="profile__card_img"
						style={{
							width: 232,
							height: 232
						}}
						priority={true}
						width={540}
						height={540}
						src={
							userState?.avatarPath
								? userState.avatarPath
								: '/img/user_default.png'
						}
						alt="user"
					/>
				</div>
				<div className="profile__content">
					<h1 className="profile__suptitle">Profile</h1>

					{userState?.name && (
						<h3 onClick={() => setActive(true)} className="profile__title">
							{userState.name}
						</h3>
					)}
				</div>
			</div>

			<div className="profile__content"></div>

			<Popup isActive={isActive} close={() => setActive(false)}>
				<ProfileEditForm
					avatarPath={userState?.avatarPath}
					name={userState?.name}
					onSubmitHandler={() => setActive(false)}
				/>
			</Popup>
		</div>
	)
}

export default Profile
