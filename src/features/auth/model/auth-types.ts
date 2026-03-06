import { UserDto } from '@/entites/user-profile/model/user-types'

export interface AuthDto {
	email: string
	password: string
}

export interface AuthTokens {
	accessToken: string
	refreshToken: string
}

export interface AuthResponse {
	user: UserDto
	accessToken: string
	refreshToken: string
}

export interface FormProps {
	title: string
	onSubmitAction: (data: AuthDto) => Promise<void>
	link: { name: string; url: string }
}

export interface AuthStateActions {
	setAccessToken: (token: string) => void
	setLogout: () => void
	setIsHydrated: (value: boolean) => void
}

export interface AuthState {
	accessToken: string
	refreshTokenTimer?: number
	isHydrated: boolean
}

export interface AuthStateTypes extends AuthState, AuthStateActions {}
