import type { Metadata } from 'next'
import { Lexend_Deca } from 'next/font/google'
import { AppColumn } from '@/shared/ui/layout/app-column'
import { TanstackProvider } from '@/shared/providers/query-client-provider'
import '@/styles/global.scss'

const lexendDeca = Lexend_Deca({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: { template: '%s ', default: '' },
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${lexendDeca.className} antialiased`}>
				<TanstackProvider>
					<AppColumn>{children}</AppColumn>
				</TanstackProvider>
			</body>
		</html>
	)
}
