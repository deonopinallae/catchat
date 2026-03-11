import { request } from '@/shared/lib/request'
import { ENDPOINTS } from '@/shared/api/endpoints'
import {
	AuthDto,
	AuthResponse,
	PhoneCheckResponse,
	SendCodeResponse,
	VerifyCodeDto,
} from '../model/auth-types'

export const checkPhoneNumber = (body: AuthDto): Promise<PhoneCheckResponse> =>
	request<PhoneCheckResponse, AuthDto>(ENDPOINTS.auth.checkPhone, 'POST', body)

export const sendVerificationCode = (body: AuthDto): Promise<SendCodeResponse> =>
	request<SendCodeResponse, AuthDto>(ENDPOINTS.auth.sendCode, 'POST', body)

export const verifyCode = (body: VerifyCodeDto): Promise<AuthResponse> =>
	request<AuthResponse, VerifyCodeDto>(ENDPOINTS.auth.verifyCode, 'POST', body)

export const login = (body: AuthDto): Promise<AuthResponse> =>
	request<AuthResponse, AuthDto>(ENDPOINTS.auth.login, 'POST', body)

export const register = (body: AuthDto): Promise<AuthResponse> =>
	request<AuthResponse, AuthDto>(ENDPOINTS.auth.register, 'POST', body)

export const refreshAccessToken = (): Promise<AuthResponse> =>
	request<AuthResponse>(ENDPOINTS.auth.refreshToken, 'POST')

export const logout = (): Promise<void> => request(ENDPOINTS.auth.logout, 'POST')
