import type { PropsWithChildren } from 'react'
import { Page } from '@/shared/ui'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<Page className="items-center justify-end text-center">{children}</Page>
		</>
	)
}
