interface OtpCodeInputProps {
	codeLength: number
	verificationCode: string
}

export const OtpCodeInput = ({ codeLength, verificationCode }: OtpCodeInputProps) => {
	return (
		<div className="mx-auto mt-12 flex w-full max-w-[15.5rem] justify-between">
			{Array.from({ length: codeLength }).map((_, index) => {
				const digit = verificationCode[index]
				return (
					<div
						key={`otp-digit-${index}`}
						className="flex h-10 w-8 items-center justify-center border-b border-[#0f1828] text-[2rem] leading-none font-bold text-[#0f1828]"
					>
						{digit ?? ''}
					</div>
				)
			})}
		</div>
	)
}
