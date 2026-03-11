'use client'
import { refreshAccessToken } from '../api/auth-repository'
import { useAuthStore } from './auth-store'
import { AuthStateTypes } from './auth-types'
import { getApiErrorMessage } from '@/shared/lib/api-error'

type AuthStateSetter = (state: Partial<AuthStateTypes>) => void

export const startRefreshTokenTimer = (
	set: AuthStateSetter,
	get: () => AuthStateTypes,
) => {
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

const FALLBACK_AUTH_ERROR_MESSAGE =
	'Не удалось выполнить вход. Проверьте номер телефона и попробуйте ещё раз позже.'

export const getAuthErrorMessage = (error: unknown) => {
	return getApiErrorMessage(error, FALLBACK_AUTH_ERROR_MESSAGE)
}
