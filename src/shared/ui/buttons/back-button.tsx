import type { ButtonHTMLAttributes } from 'react'
import { BackIcon } from '@/shared/ui/icons'

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BackButton = ({ className, ...props }: BackButtonProps) => {
	return (
		<button
			type="button"
			aria-label="Go back"
			className={`absolute left-6 top-[1.62rem] flex h-6 w-6 items-center justify-center text-[#0f1828] ${className ?? ''}`}
			{...props}
		>
			<BackIcon />
		</button>
	)
}
