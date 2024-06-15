'use client'

import AuthService from '@/services/auth/auth.service'
import { ISign } from '@/types/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import './Auth.scss'

const SingIn = () => {
	const rounter = useRouter()
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<{
		email: string
		password: string
	}>()

	const mutation = useMutation({
		mutationFn: (obj: ISign) => AuthService.signIn(obj),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['session'] })
			rounter.replace('/uta_pleasure')
		}
	})

	return (
		<div className="auth">
			<form
				className="auth__form"
				onSubmit={handleSubmit(data => mutation.mutate(data))}
			>
				<div className="auth__form_header">Sign in</div>

				<hr />

				<div className="auth__input">
					<label className="auth__label" htmlFor="auth_email">
						Email:
					</label>
					<input
						id="auth_email"
						type="email"
						placeholder="Email"
						{...register('email', { required: true })}
						aria-invalid={errors.email ? 'true' : 'false'}
					/>
				</div>
				<div className="auth__input">
					<label className="auth__label" htmlFor="auth_password">
						Password:
					</label>
					<input
						id="auth_password"
						type="password"
						placeholder="Password"
						{...register('password', { required: true })}
						aria-invalid={errors.password ? 'true' : 'false'}
					/>
				</div>

				<input className="auth__submit" type="submit" value="Submit" />
				<hr />

				<div className="auth__footer">
					<div className="auth__footer_title">Don't have an account?</div>

					<Link href="/uta_pleasure/auth/sign-up" title="Register with UT">
						Register with UT.
					</Link>
				</div>
			</form>
		</div>
	)
}

export default SingIn
