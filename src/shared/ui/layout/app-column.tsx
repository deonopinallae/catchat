import { ReactNode } from 'react'

export const AppColumn = ({ children }: { children: ReactNode }) => {
	return (
			<div className="relative app-column bg-white min-h-[100vh] flex flex-col my-0 mx-auto">
				<div className="absolute bg-white inset-0 -z-10"></div>
				<div className="relative z-10 min-h-[100vh] overflow-hidden">
					{children}
				</div>
			</div>
	)
}
