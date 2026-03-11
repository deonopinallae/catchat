'use client'

import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Input } from '@/shared/ui/input'
import { BackButton, Button, ErrorMessage } from '@/shared/ui'
import { LoadingMessage } from '@/shared/ui/loading-message'
import { useAuthForm } from '@/features/auth/model/use-auth-form'
import { AuthDto } from '@/features/auth/model/auth-types'
import {
	checkPhoneNumber,
	login,
	register as registerByPhone,
} from '@/features/auth/api/auth-repository'
import { useAuthStore } from '@/features/auth/model/auth-store'
import { useRouter } from 'next/navigation'
import { PAGES } from '@/shared/lib/pages.config'
import { PhoneKeypad } from '@/features/auth/ui/phone-keypad'
import { CountryCodeSelect } from '@/features/auth/ui/country-code-select'
import { getAuthErrorMessage } from '@/features/auth/model/auth-helpers'

export default function AuthPage() {
	const [error, setError] = useState<string>('')
	const [selectedDialCode, setSelectedDialCode] = useState('+62')
	const router = useRouter()
	const { setAccessToken } = useAuthStore.getState()

	const { register, handleSubmit, reset, setValue, watch, errors, isSubmitting } =
		useAuthForm()
	const phoneNumber = watch('phoneNumber')

	const handleDigitClick = (digit: string) => {
		const numericPhone = phoneNumber.replace(/\D/g, '')
		if (numericPhone.length >= 15) return
		setValue('phoneNumber', `${numericPhone}${digit}`, { shouldValidate: true })
	}

	const handleBackspace = () => {
		setValue('phoneNumber', phoneNumber.slice(0, -1), { shouldValidate: true })
	}

	const onSubmit: SubmitHandler<AuthDto> = async (data) => {
		setError('')
		try {
			const normalizedPayload = {
				phoneNumber: data.phoneNumber.startsWith('+')
					? data.phoneNumber
					: `${selectedDialCode}${data.phoneNumber}`,
			}

			const { exists } = await checkPhoneNumber(normalizedPayload)
			const response = exists
				? await login(normalizedPayload)
				: await registerByPhone(normalizedPayload)
			setAccessToken(response.accessToken)
			router.push(PAGES.HOME)
			reset()
		} catch (error) {
			setError(getAuthErrorMessage(error))
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="relative flex h-full w-full flex-col px-6 pt-[10.56rem]"
		>
			<BackButton onClick={() => router.back()} />

			<div className="mx-auto w-full max-w-[18.4375rem] text-center">
				<h1 className="mb-2 text-4xl leading-none font-bold text-[#0f1828]">
					Enter Your Phone Number
				</h1>
				<p className="text-sm leading-6 text-[#0f1828]">
					Please confirm your country code and enter your phone number
				</p>
			</div>

			<div className="mt-12 flex w-full gap-2">
				<CountryCodeSelect onSelectDialCode={setSelectedDialCode} />

				<Input
					{...register('phoneNumber')}
					placeholder="Phone Number"
					type="tel"
					inputMode="numeric"
					className="h-9 flex-1 rounded bg-[#f7f7fc] px-2 py-[0.375rem] leading-6 font-semibold text-[#0f1828] placeholder:text-[#adb5bd]"
				/>
			</div>

			<div className="relative mt-2 min-h-8">
				{errors.phoneNumber ? (
					<div className="absolute inset-x-0 top-0">
						<ErrorMessage errorMessage={errors.phoneNumber.message} />
					</div>
				) : error ? (
					<p className="absolute inset-x-0 top-0 text-[red]">{error}</p>
				) : null}
			</div>

			<Button type="submit" disabled={isSubmitting} className="mt-[1rem] m-auto">
				{isSubmitting ? <LoadingMessage /> : 'Continue'}
			</Button>

			<PhoneKeypad onDigitClick={handleDigitClick} onBackspace={handleBackspace} />
		</form>
	)
}
