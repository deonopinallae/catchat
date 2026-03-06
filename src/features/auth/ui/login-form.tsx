'use client'
import { AuthForm } from './auth-form'
import { PAGES } from '@/shared/lib/pages.config'
import { useRouter } from 'next/navigation'
import { AuthDto } from '../model/auth-types'
import { login } from '../api/auth-repository'
import { useAuthStore } from '../model/auth-store'

export const LoginForm = () => {
	const router = useRouter()
	const {setAccessToken} = useAuthStore.getState()

	async function handleLogin(data: AuthDto) {
		const response = await login(data)
		setAccessToken(response.accessToken)
		router.push(PAGES.HOME)
	}

	return (
		<>
			<AuthForm
				title="Login"
				onSubmitAction={handleLogin}
				link={{ name: 'Registration', url: PAGES.REGISTRATION }}
			/>
		</>
	)
}
