'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui'
import Link from 'next/link'

export default function WelcomePage() {
	const router = useRouter()

	return (
		<div className="mb-14 flex w-full max-w-[20.4375rem] flex-col items-center gap-10">
			<h1 className="text-2xl leading-[1.875rem] font-bold text-[#0f1828]">
				Easily find new friends over countries!
			</h1>
			<div className="flex w-full flex-col items-center gap-[1.125rem]">
				<Link href="#" className="text-sm leading-6 font-semibold text-[#0f1828]">
					Terms & Privacy Policy
				</Link>
				<Button type="button" onClick={() => router.push('/auth')}>
					Let's friending!
				</Button>
			</div>
		</div>
	)
}
