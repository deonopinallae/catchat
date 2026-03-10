import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			className={`w-full rounded-[1.875rem] bg-[var(--color-main)] px-12 py-3 text-center text-base leading-7 font-semibold text-[#f7f7fc] ${className ?? ''}`}
		>
			{children}
		</button>
	)
}
