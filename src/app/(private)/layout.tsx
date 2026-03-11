import type { PropsWithChildren } from 'react'
import { AuthProvider } from '@/features/auth/ui/auth-provider'
import { Menu } from '@/features/menu/ui/menu'
import { Header, Page } from '@/shared/ui'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<Header />
			<Page className="container pb-[5rem] gap-[1.25rem] mt-[1.81rem]">
				{children}
			</Page>
			<Menu />
			{/* <AuthProvider>{children}</AuthProvider> */}
		</>
	)
}
