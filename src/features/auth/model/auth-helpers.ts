'use client'
import { refreshAccessToken } from '../api/auth-repository'
import { useAuthStore } from './auth-store'
import { AuthStateTypes } from './auth-types'

export const startRefreshTokenTimer = (set: any, get: () => AuthStateTypes) => {
	if (get().refreshTokenTimer) clearTimeout(get().refreshTokenTimer)

	const timer = window.setTimeout(
		async () => {
			try {
				const { accessToken } = await refreshAccessToken()
				get().setAccessToken(accessToken)
			} catch {
				get().setLogout()
			}
		},
		55 * 60 * 1000,
	)

	set({ refreshTokenTimer: timer })
}

export const initializeAuth = async () => {
	const { setAccessToken, setLogout, setIsHydrated } = useAuthStore.getState()

	try {
		const { accessToken } = await refreshAccessToken()
		setAccessToken(accessToken)
		setIsHydrated(true)
		
	} catch {
		setLogout()
	}
}
