import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="not-found">
			<div>404</div>
			<div>page not found</div>
			<Link href="/">back to home</Link>
		</div>
	)
}
