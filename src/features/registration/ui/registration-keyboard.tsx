interface RegistrationKeyboardProps {
	onCharacterPress: (character: string) => void
	onBackspace: () => void
	onSpace: () => void
	onReturn: () => void
	onToggleNumbers: () => void
	onToggleShift: () => void
	isShiftActive: boolean
	isNumberMode: boolean
}

const letterRows = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const numberRows = [
	['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	['-', '/', ':', ';', '(', ')', '$', '&', '@'],
	['.', ',', '?', '!', "'"],
]

export const RegistrationKeyboard = ({
	onCharacterPress,
	onBackspace,
	onSpace,
	onReturn,
	onToggleNumbers,
	onToggleShift,
	isShiftActive,
	isNumberMode,
}: RegistrationKeyboardProps) => {
	const keyboardRows = isNumberMode ? numberRows : letterRows

	return (
		<div className="mt-auto -mx-6 bg-[#f7f7fc] px-3 pt-4 pb-2 text-[#0f1828]">
			{keyboardRows.map((row, rowIndex) => (
				<div
					key={`row-${rowIndex}`}
					className={`mb-3 flex items-center justify-center gap-2 ${
						rowIndex === 2 ? 'px-4' : ''
					}`}
				>
					{rowIndex === 2 && (
						<button
							type="button"
							onClick={onToggleShift}
							className="h-10 w-10 text-xl font-semibold"
						>
							⇧
						</button>
					)}
					{row.map((key) => (
						<button
							key={key}
							type="button"
							onClick={() =>
								onCharacterPress(
									isNumberMode
										? key
										: isShiftActive
											? key
											: key.toLowerCase(),
								)
							}
							className="h-10 w-8 text-[1.125rem] leading-[1.875rem] font-semibold"
						>
							{isNumberMode ? key : isShiftActive ? key : key.toLowerCase()}
						</button>
					))}
					{rowIndex === 2 && (
						<button
							type="button"
							onClick={onBackspace}
							className="h-10 text-xl font-semibold"
						>
							⌫
						</button>
					)}
				</div>
			))}

			<div className="mb-[5.5rem] flex items-center justify-between gap-2 px-1">
				<button
					type="button"
					onClick={onToggleNumbers}
					className="h-10 w-20 text-base font-semibold"
				>
					{isNumberMode ? 'ABC' : '123'}
				</button>
				<button
					type="button"
					onClick={onSpace}
					className="h-10 flex-1 rounded bg-[#ededed] text-base font-semibold"
				>
					space
				</button>
				<button
					type="button"
					onClick={onReturn}
					className="h-10 w-20 text-base font-semibold"
				>
					return
				</button>
			</div>
		</div>
	)
}
