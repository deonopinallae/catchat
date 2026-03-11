import { ReactNode } from 'react'

export const AppColumn = ({ children }: { children: ReactNode }) => {
	return (
		<div className="relative app-column bg-[var(--app-column-bg-color)] mt-[3rem] h-[50rem] flex flex-col my-0 mx-auto">
			<div className="absolute bg-white inset-0 -z-10"></div>
			<div className="relative z-10 h-full flex flex-col overflow-hidden">
				{children}
			</div>
		</div>
	)
}
