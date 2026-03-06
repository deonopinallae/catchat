import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			className={`block rounded-[7px] ${className ?? ''}`}
		>
			<span className="text-white text-md">{children}</span>
		</button>
	)
}
