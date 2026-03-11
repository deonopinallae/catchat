import type { SVGProps } from 'react'

export const MoreIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg width="32" height="32" viewBox="0 0 24 24" fill="none" {...props}>
			<circle cx="6" cy="12" r="1.8" fill="#0F1828" />
			<circle cx="12" cy="12" r="1.8" fill="#0F1828" />
			<circle cx="18" cy="12" r="1.8" fill="#0F1828" />
		</svg>
	)
}
