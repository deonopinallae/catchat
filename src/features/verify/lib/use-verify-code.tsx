'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendVerificationCode, verifyCode } from '@/features/auth/api/auth-repository'
import { useAuthStore } from '@/features/auth/model/auth-store'
import { PAGES } from '@/shared/lib/pages.config'
import { BACKEND_UNAVAILABLE_MESSAGE, hasNoBackendResponse } from '@/shared/lib/api-error'

const CODE_LENGTH = 4
const INVALID_CODE_MESSAGE = 'Неправильный код. Попробуйте ещё раз.'
const SERVER_ERROR_MESSAGE = 'Ошибка сервера. Попробуйте ещё раз чуть позже.'

const getVerifyErrorMessage = (error: unknown, context: 'verify' | 'resend') => {
	if (hasNoBackendResponse(error)) return BACKEND_UNAVAILABLE_MESSAGE

	if (context === 'resend') return SERVER_ERROR_MESSAGE

	if (error && typeof error === 'object') {
		const statusCode =
			'statusCode' in error && typeof error.statusCode === 'number'
				? error.statusCode
				: undefined

		const rawMessage =
			'message' in error
				? Array.isArray(error.message)
					? error.message.join(' ').toLowerCase()
					: typeof error.message === 'string'
						? error.message.toLowerCase()
						: ''
				: ''

		const looksLikeInvalidCode =
			statusCode === 400 ||
			statusCode === 401 ||
			statusCode === 403 ||
			statusCode === 422 ||
			rawMessage.includes('invalid code') ||
			rawMessage.includes('wrong code') ||
			rawMessage.includes('incorrect code') ||
			rawMessage.includes('otp') ||
			rawMessage.includes('код')

		if (looksLikeInvalidCode) return INVALID_CODE_MESSAGE
	}

	return SERVER_ERROR_MESSAGE
}

export const useVerifyCode = (phoneNumber: string) => {
	const router = useRouter()
	const { setAccessToken } = useAuthStore.getState()

	const [verificationCode, setVerificationCode] = useState('')
	const [error, setError] = useState('')
	const [resendMessage, setResendMessage] = useState('')
	const [isVerifying, setIsVerifying] = useState(false)

	const verifyEnteredCode = async (code: string) => {
		if (code.length !== CODE_LENGTH || isVerifying) return

		setIsVerifying(true)
		setError('')
		setResendMessage('')
		try {
			const response = await verifyCode({ phoneNumber, code })
			setAccessToken(response.accessToken)
			router.push(PAGES.HOME)
		} catch (err) {
			setVerificationCode('')
			setError(getVerifyErrorMessage(err, 'verify'))
		} finally {
			setIsVerifying(false)
		}
	}

	const handleDigitClick = (digit: string) => {
		if (verificationCode.length >= CODE_LENGTH) return
		setError('')
		setResendMessage('')
		const nextCode = `${verificationCode}${digit}`
		setVerificationCode(nextCode)
		void verifyEnteredCode(nextCode)
	}

	const handleBackspace = () => {
		setError('')
		setVerificationCode((previousValue) => previousValue.slice(0, -1))
	}

	const handleResendCode = async () => {
		setError('')
		setResendMessage('')
		try {
			await sendVerificationCode({ phoneNumber })
			setResendMessage('Код отправлен повторно.')
		} catch (err) {
			setError(getVerifyErrorMessage(err, 'resend'))
		}
	}

	return {
		codeLength: CODE_LENGTH,
		verificationCode,
		error,
		resendMessage,
		handleDigitClick,
		handleBackspace,
		handleResendCode,
	}
}
