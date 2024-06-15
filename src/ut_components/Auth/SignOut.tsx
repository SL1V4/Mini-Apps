'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import AuthService from '@/services/auth/auth.service'

const SignOut = () => {
	const rounter = useRouter()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => AuthService.signOut(),
		async onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['session'] })
			rounter.replace('/uta_pleasure')
		}
	})

	return (
		<button className="ut__button" onClick={() => mutation.mutate()}>
			Sign out
		</button>
	)
}

export default SignOut
