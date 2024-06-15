import { IUser, IUserState } from '@/types/user.interface'
import { useQuery } from '@tanstack/react-query'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { createContext } from 'react'
import { AxiosError } from 'axios'
import AuthService from '@/services/auth/auth.service'

export const UserContext = createContext(null)

interface ISessionQuery {
	data: IUser
	isError: boolean
	isLoading: boolean
	error: AxiosError
}

const CheckSession: FC<PropsWithChildren> = ({ children }) => {
	const [userState, setUserState] = useState<IUserState>({ isLoading: true })
	const { data, error, isError, isLoading }: ISessionQuery = useQuery({
		queryKey: ['session'],
		queryFn: () => AuthService.getSessionInfo(),
		retry: 0,
		staleTime: 36000
	})

	useEffect(() => {
		if (isLoading) {
			return setUserState({ isLoading: true })
		}

		if ((isError || !data?.id) && error?.response?.status === 401) {
			setUserState({})
		} else {
			setUserState({
				id: data.id,
				email: data.email,
				name: data?.name,
				avatarPath: data?.avatarPath
			})
		}
	}, [data, isError, isLoading])

	return (
		<UserContext.Provider
			value={{
				userState,
				setUserState
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default CheckSession
