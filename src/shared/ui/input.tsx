import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	className?: string
	type: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ placeholder, className, type, ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				placeholder={placeholder}
				className={`${className} `}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'
