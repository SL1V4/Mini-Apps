import { FC, PropsWithChildren, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { IEditProfileRequest } from '@/types/user.interface'
import UserService from '@/services/user/user.service'
import Image from 'next/image'
import editIcon from './img/edit.svg'

import './ProfileEditForm.scss'

interface IEditProfileProps {
	avatarPath?: string
	name?: string
	onSubmitHandler?(): void
}

interface IEditProfileState {
	avatarPath?: string
	name?: string
	avatar?: File
	isLoading?: boolean
	photoEvent?: string
}

const ProfileEditForm: FC<PropsWithChildren<IEditProfileProps>> = ({
	avatarPath,
	name = '',
	onSubmitHandler
}) => {
	const queryClient = useQueryClient()

	const [editFormState, setIditFormState] = useState<IEditProfileState>({
		avatarPath: avatarPath,
		name: name,
		photoEvent: 'add'
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IEditProfileState>()

	const mutation = useMutation({
		mutationFn: (obj: IEditProfileRequest) => UserService.update(obj),
		async onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['session'] })

			setIditFormState(prev => ({
				...prev,
				isLoading: false,
				avatar: null,
				photoEvent: 'add'
			}))

			if (typeof onSubmitHandler === 'function') {
				onSubmitHandler()
			}
		},
		async onMutate() {
			setIditFormState(prev => ({
				...prev,
				isLoading: true
			}))
		}
	})

	function editUserProfileOnSubmit() {
		const data: IEditProfileRequest = {
			body: {
				name: editFormState.name,
				photoEvent: editFormState.photoEvent
			},
			avatar: editFormState.avatar
		}

		mutation.mutate(data)
	}

	function onChangeNameInput(e: React.ChangeEvent<HTMLInputElement>) {
		setIditFormState(prev => ({
			...prev,
			name: e.target.value
		}))
	}

	function setPreviewAvatar(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault()

		const avatar = e.target.files[0]

		if (avatar) {
			setIditFormState(prev => ({
				...prev,
				avatarPath: URL.createObjectURL(avatar),
				avatar: avatar,
				photoEvent: 'add'
			}))
		}
	}

	function removePreviewAvatar() {
		setIditFormState(prev => ({
			...prev,
			avatarPath: '',
			file: null,
			photoEvent: 'delete'
		}))
	}

	return (
		<div>
			<form
				className="profile__edit_form"
				onSubmit={handleSubmit(() => editUserProfileOnSubmit())}
			>
				<div className="profile__edit_form__header">
					<h3 className="edit__popap_title">Profile data</h3>
				</div>

				<div className="profile__edit_form__content">
					<div className="profile__edit_img__wrap">
						<Image
							className="profile__edit_img"
							style={{
								width: 150,
								height: 150
							}}
							priority={true}
							width={150}
							height={150}
							src={
								editFormState.avatarPath
									? editFormState.avatarPath
									: '/img/user_default.png'
							}
							alt="user"
						/>

						<div className="profile__edit_img__edit">
							<label
								className="profile__edit_img__button"
								htmlFor="avatar_update"
							>
								<input
									className="profile__edit_form__input file__input"
									type="file"
									id="avatar_update"
									{...register('avatarPath', { required: false })}
									onChange={setPreviewAvatar}
								/>
								Select photo
							</label>

							<div className="pen__icon">
								<img src={editIcon.src} alt="edit__img" />
							</div>

							<label
								className="profile__edit_img__button"
								onClick={removePreviewAvatar}
							>
								Remove photo
							</label>
						</div>
					</div>

					<div className="profile__edit_form__inputs">
						<input
							className="profile__edit_form__input"
							placeholder="Name"
							type="text"
							onInput={onChangeNameInput}
							value={editFormState.name}
							aria-invalid={errors.name ? 'true' : 'false'}
							{...register('name', { required: true })}
						/>
						<input
							className="profile__edit_form__submit"
							type="submit"
							value={editFormState.isLoading ? 'Save...' : 'Save'}
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ProfileEditForm
