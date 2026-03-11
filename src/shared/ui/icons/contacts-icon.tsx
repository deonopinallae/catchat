import type { SVGProps } from 'react'

export const ContactsIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg width="32" height="32" viewBox="0 0 24 24" fill="none" {...props}>
			<path
				d="M16 20V19C16 17.3431 14.6569 16 13 16H7C5.34315 16 4 17.3431 4 19V20"
				stroke="#0F1828"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<circle cx="10" cy="9" r="3" stroke="#0F1828" strokeWidth="1.8" />
			<path
				d="M20 20V19C20 17.8368 19.3358 16.8288 18.3655 16.332"
				stroke="#0F1828"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M15 6.13C15.8874 6.58717 16.5 7.51186 16.5 8.58C16.5 9.64814 15.8874 10.5728 15 11.03"
				stroke="#0F1828"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	)
}
