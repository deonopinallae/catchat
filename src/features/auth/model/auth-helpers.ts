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

const FALLBACK_AUTH_ERROR_MESSAGE =
	'Не удалось выполнить вход. Проверьте номер телефона и попробуйте ещё раз позже.'

export const getAuthErrorMessage = (error: unknown) => {
	if (error && typeof error === 'object' && 'message' in error) {
		const message = (error as { message?: unknown }).message

		if (Array.isArray(message)) {
			return message.filter(Boolean).join(', ') || FALLBACK_AUTH_ERROR_MESSAGE
		}

		if (typeof message === 'string') {
			const normalizedMessage = message.toLowerCase()
			if (
				normalizedMessage.includes('unexpected token') ||
				normalizedMessage.includes('not valid json')
			) {
				return FALLBACK_AUTH_ERROR_MESSAGE
			}

			return message
		}
	}

	if (error instanceof Error) {
		const normalizedMessage = error.message.toLowerCase()
		if (
			normalizedMessage.includes('unexpected token') ||
			normalizedMessage.includes('not valid json')
		) {
			return FALLBACK_AUTH_ERROR_MESSAGE
		}

		return error.message || FALLBACK_AUTH_ERROR_MESSAGE
	}

	return FALLBACK_AUTH_ERROR_MESSAGE
}
