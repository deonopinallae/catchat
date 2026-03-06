import { ENDPOINTS } from '@/shared/api/endpoints'
import { request } from '@/shared/lib/request'
import { UserDto, UserProfileResponse } from '../model/user-types'

export const getUserProfile = async(): Promise<UserProfileResponse> =>
	await request<UserProfileResponse>(ENDPOINTS.user.profile)

export const updateUserProfile = (body: UserDto): Promise<UserProfileResponse> =>
	request<UserProfileResponse, UserDto>(ENDPOINTS.user.profile, 'PUT', body)
