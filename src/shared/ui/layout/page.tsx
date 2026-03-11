import { ReactNode } from 'react'
export const Page = ({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) => (
	<div className={`${className ?? ''} h-full w-full flex flex-1 min-h-0 flex-col`}>
		{children}
	</div>
)
