'use client'
import { useRouter } from 'next/navigation'
import { login, register } from '../api/auth-repository'
import { useAuthStore } from '../model/auth-store'
import { AuthDto } from '../model/auth-types'
import { AuthForm } from './auth-form'
import { PAGES } from '@/shared/lib/pages.config'

export const RegistrationForm = () => {
	const router = useRouter()
	const { setAccessToken } = useAuthStore.getState()

	const handleRegistration = async (data: AuthDto) => {
		const res = await register(data)

		const response = await login(data)
		setAccessToken(response.accessToken)
		router.push(PAGES.HOME)
	}
	return (
		<>
			<AuthForm
				title="Registration"
				onSubmitAction={handleRegistration}
				link={{ name: 'Login', url: PAGES.LOGIN }}
			/>
		</>
	)
}
