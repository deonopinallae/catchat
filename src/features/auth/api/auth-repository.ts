import { request } from '@/shared/lib/request'
import { ENDPOINTS } from '@/shared/api/endpoints'
import { AuthDto, AuthResponse } from '../model/auth-types'

export const login = (body: AuthDto): Promise<AuthResponse> =>
	request<AuthResponse, AuthDto>(ENDPOINTS.auth.login, 'POST', body)

export const register = (body: AuthDto): Promise<AuthResponse> =>
	request<AuthResponse, AuthDto>(ENDPOINTS.auth.register, 'POST', body)

export const refreshAccessToken = (): Promise<AuthResponse> =>
	request<AuthResponse>(ENDPOINTS.auth.refreshToken, 'POST')

export const logout = (): Promise<void> => request(ENDPOINTS.auth.logout, 'POST')
