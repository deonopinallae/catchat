import type { PropsWithChildren } from 'react'
import { AuthProvider } from '@/features/auth/ui/auth-provider'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<AuthProvider>{children}</AuthProvider>
		</>
	)
}
