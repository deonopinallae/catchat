import { ReactNode } from 'react'
export const Page = ({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) => (
	<div className={`${className} min-h-[100vh] min-w-full flex flex-col grow`}>
		{children}
	</div>
)
