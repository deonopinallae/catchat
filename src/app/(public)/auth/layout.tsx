import styles from './styles.module.scss'
import type { PropsWithChildren } from 'react'
import Image from 'next/image'
import { ellipses } from '@/shared/ui/ellipses'
import { Page } from '@/shared/ui'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<Page className="text-center justify-end">
				{children}
			</Page>
		</>
	)
}
