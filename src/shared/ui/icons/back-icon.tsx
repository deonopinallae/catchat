import type { SVGProps } from 'react'

export const BackIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="8"
			height="14"
			viewBox="0 0 8 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M7 1L1 7L7 13"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
