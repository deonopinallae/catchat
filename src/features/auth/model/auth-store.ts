'use client'
import { AuthState, AuthStateTypes } from './auth-types'
import { logout } from '../api/auth-repository'
import { createStore } from '@/shared/lib/create-store'
import { startRefreshTokenTimer } from './auth-helpers'

const initialState: AuthState = {
	accessToken: '',
	refreshTokenTimer: undefined,
	isHydrated: false,
}
export const useAuthStore = createStore<AuthStateTypes>((set, get) => ({
	...initialState,
	setAccessToken: (token) => {
		set({ accessToken: token })
		startRefreshTokenTimer(set, get)
	},

	setIsHydrated: (value) => set({ isHydrated: value }),

	setLogout: async () => {
		if (get().refreshTokenTimer) clearTimeout(get().refreshTokenTimer)
		set({ ...initialState, isHydrated: true })
		await logout()
	},
}))
