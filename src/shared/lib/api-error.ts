export const BACKEND_UNAVAILABLE_MESSAGE =
	'Сервер временно недоступен. Попробуйте ещё раз чуть позже.'

export const hasNoBackendResponse = (error: unknown) => {
	if (error && typeof error === 'object' && 'message' in error) {
		const message = (error as { message?: unknown }).message
		const normalizedMessage = Array.isArray(message)
			? message.join(' ').toLowerCase()
			: typeof message === 'string'
				? message.toLowerCase()
				: ''

		return (
			normalizedMessage.includes('unexpected token') ||
			normalizedMessage.includes('not valid json') ||
			normalizedMessage.includes('failed to fetch') ||
			normalizedMessage.includes('networkerror') ||
			normalizedMessage.includes('load failed')
		)
	}

	if (error instanceof Error) {
		const normalizedMessage = error.message.toLowerCase()
		return (
			normalizedMessage.includes('unexpected token') ||
			normalizedMessage.includes('not valid json') ||
			normalizedMessage.includes('failed to fetch') ||
			normalizedMessage.includes('networkerror') ||
			normalizedMessage.includes('load failed')
		)
	}

	return false
}

export const getApiErrorMessage = (
	error: unknown,
	fallbackMessage: string = BACKEND_UNAVAILABLE_MESSAGE,
) => {
	if (hasNoBackendResponse(error)) {
		return BACKEND_UNAVAILABLE_MESSAGE
	}

	if (error && typeof error === 'object' && 'message' in error) {
		const message = (error as { message?: unknown }).message

		if (Array.isArray(message)) {
			return message.filter(Boolean).join(', ') || fallbackMessage
		}

		if (typeof message === 'string') {
			return message || fallbackMessage
		}
	}

	if (error instanceof Error) {
		return error.message || fallbackMessage
	}

	return fallbackMessage
}
