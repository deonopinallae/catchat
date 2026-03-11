import type { SVGProps } from 'react'

export const HomeIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg width="32" height="32" viewBox="0 0 24 24" fill="none" {...props}>
			<path
				d="M4 10.5L12 4L20 10.5"
				stroke="#0F1828"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6 9.5V19C6 19.5523 6.44772 20 7 20H10V15.5C10 14.9477 10.4477 14.5 11 14.5H13C13.5523 14.5 14 14.9477 14 15.5V20H17C17.5523 20 18 19.5523 18 19V9.5"
				stroke="#0F1828"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
