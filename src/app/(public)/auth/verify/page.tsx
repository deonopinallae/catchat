'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { BackButton } from '@/shared/ui'
import { PhoneKeypad } from '@/features/auth/ui/phone-keypad'
import { useVerifyCode } from '@/features/verify/lib/use-verify-code'
import { OtpCodeInput } from '@/features/verify/ui/otp-code-input'

export default function VerifyPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const phoneNumber = searchParams.get('phone') ?? '+62'
	const {
		codeLength,
		verificationCode,
		error,
		resendMessage,
		handleDigitClick,
		handleBackspace,
		handleResendCode,
	} = useVerifyCode(phoneNumber)

	return (
		<div className="relative flex h-full w-full flex-1 flex-col px-6 pt-[10.56rem]">
			<BackButton onClick={() => router.back()} />

			<div className="mx-auto w-full max-w-[16.3125rem] text-center">
				<h1 className="mb-2 text-4xl leading-none font-bold text-[#0f1828]">
					Enter Code
				</h1>
				<p className="text-sm leading-6 text-[#0f1828]">
					We have sent you an SMS with the code to {phoneNumber}
				</p>
			</div>

			<OtpCodeInput codeLength={codeLength} verificationCode={verificationCode} />

			<div className="relative mt-2 min-h-8 text-center text-sm">
				{error ? (
					<p className="absolute inset-x-0 top-0 text-[red]">{error}</p>
				) : resendMessage ? (
					<p className="absolute inset-x-0 top-0 text-[#0f1828]">
						{resendMessage}
					</p>
				) : null}
			</div>

			<button type="button" onClick={handleResendCode} className="m-auto mt-[1rem]">
				resend code
			</button>

			<PhoneKeypad onDigitClick={handleDigitClick} onBackspace={handleBackspace} />
		</div>
	)
}
