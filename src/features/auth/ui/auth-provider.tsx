'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initializeAuth } from '../model/auth-helpers'
import { LoadingOverlay } from '@/shared/ui'
import { PAGES } from '@/shared/lib/pages.config'
import { useAuthStore } from '../model/auth-store'

interface AuthProviderProps {
	children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter()
	const { accessToken, isHydrated } = useAuthStore()

	useEffect(() => {
		initializeAuth()
	}, [])

	useEffect(() => {
		if (isHydrated && !accessToken) {
			router.push(PAGES.LOGIN)
		}
	}, [isHydrated, accessToken, router])

	if (!isHydrated) return <LoadingOverlay />
	if (!accessToken) return <LoadingOverlay />

	return <>{children}</>
}
