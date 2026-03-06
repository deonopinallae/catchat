import { refreshAccessToken } from '@/features/auth/api/auth-repository'
import { useAuthStore } from '@/features/auth/model/auth-store'
import { ErrorResponse } from '@/shared/types/error'
import { ENDPOINTS } from '../api/endpoints'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export const request = async <T, D = undefined>(
	url: string,
	method: HttpMethod = 'GET',
	data?: D,
	retry = true,
): Promise<T> => {
	const { accessToken } = useAuthStore.getState()

	if (
		!accessToken &&
		url !== ENDPOINTS.auth.refreshToken &&
		url !== ENDPOINTS.auth.login
	) {
		throw { statusCode: 401, message: 'Unauthorized' }
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(accessToken && { Authorization: `Bearer ${accessToken}` }),
		},
		credentials: 'include',
		body: data ? JSON.stringify(data) : undefined,
	})

	if (
		res.status === 401 &&
		retry &&
		url !== ENDPOINTS.auth.login &&
		url !== ENDPOINTS.auth.refreshToken
	) {
		try {
			await refreshAccessToken()
			return request<T, D>(url, method, data, false)
		} catch {
			useAuthStore.getState().setLogout()
			throw { statusCode: 401, message: 'Unauthorized' }
		}
	}

	if (!res.ok) {
		const errorData: ErrorResponse = await res.json()
		throw errorData
	}

	return res.json() as Promise<T>
}
