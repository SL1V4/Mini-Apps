'use client'

import { clientQuery } from '@/api/client-query'
import { IGlobalObject } from '@/types/global.type'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { createContext } from 'react'
import CheckSession from './CheckSession'

export const SongContext = createContext(null)

export function AppProvider({ children }: { children?: ReactNode }) {
	const [globalState, setGlobalState] = useState<IGlobalObject>({
		isPause: true,
		repeat: false,
		random: false
	})

	return (
		<QueryClientProvider client={clientQuery}>
			<SongContext.Provider
				value={{
					globalState,
					setGlobalState
				}}
			>
				<CheckSession>{children}</CheckSession>
			</SongContext.Provider>
		</QueryClientProvider>
	)
}
