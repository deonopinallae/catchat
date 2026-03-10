import type { Metadata } from 'next'
import { Lato, Mulish } from 'next/font/google'
import { AppColumn } from '@/shared/ui/layout/app-column'
import { TanstackProvider } from '@/shared/providers/query-client-provider'
import '@/styles/global.scss'

const mulish = Mulish({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-mulish',
})

const lato = Lato({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-lato',
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
			<body className={`${mulish.variable} ${lato.variable} antialiased`}>
				<TanstackProvider>
					<AppColumn>{children}</AppColumn>
				</TanstackProvider>
			</body>
		</html>
	)
}
