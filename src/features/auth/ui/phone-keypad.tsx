interface PhoneKeypadProps {
	onDigitClick: (digit: string) => void
	onBackspace: () => void
}

export const PhoneKeypad = ({ onDigitClick, onBackspace }: PhoneKeypadProps) => {
	return (
		<div className="text-[1.5rem] py-[1.5rem] mt-auto -mx-6 grid grid-cols-3 gap-y-3 bg-[#f7f7fc] px-[0.875rem]">
			{['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
				<button
					key={digit}
					type="button"
					onClick={() => onDigitClick(digit)}
					className="h-12 rounded leading-none font-bold text-[#0f1828]"
				>
					{digit}
				</button>
			))}
			<div className="h-12" />
			<button
				type="button"
				onClick={() => onDigitClick('0')}
				className="h-12 rounded leading-none font-bold text-[#0f1828]"
			>
				0
			</button>
			<button
				type="button"
				onClick={onBackspace}
				className="h-12 rounded leading-none font-semibold text-[#0f1828]"
			>
				⌫
			</button>
		</div>
	)
}
