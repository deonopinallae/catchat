import { UserDto } from '@/entities/user-profile/model/user-types'

export interface AuthDto {
	phoneNumber: string
}

export interface PhoneCheckResponse {
	exists: boolean
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
