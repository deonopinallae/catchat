'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PAGES } from '@/shared/lib/pages.config'
import { ChatsIcon, ContactsIcon, HomeIcon, MoreIcon } from '@/shared/ui/icons'

const menuItems = [
	{ label: 'home', href: PAGES.HOME, icon: <HomeIcon /> },
	{ label: 'contacts', href: PAGES.CONTACTS, icon: <ContactsIcon /> },
	{ label: 'chats', href: PAGES.CHATS, icon: <ChatsIcon /> },
	{ label: 'more', href: PAGES.MORE, icon: <MoreIcon /> },
] as const

export const Menu = () => {
	const pathname = usePathname()

	const isItemActive = (href: string) => {
		if (href === PAGES.HOME) {
			return pathname === PAGES.HOME
		}

		return pathname.startsWith(href)
	}

	return (
		<div className="mt-auto h-[5.1875rem] w-full bg-white shadow-[0_-1px_24px_0_rgba(0,0,0,0.04)]">
			<nav
				className="mx-4 flex items-start justify-between pt-3"
				aria-label="Bottom navigation"
			>
				{menuItems.map((item) => {
					const isActive = isItemActive(item.href)

					return (
						<Link
							key={item.label}
							href={item.href}
							aria-current={isActive ? 'page' : undefined}
							className="flex h-11 w-[3.625rem] flex-col items-center justify-center"
						>
							{isActive ? (
								<>
									<span
										className="text-sm leading-6 font-semibold text-[#0f1828]"
										style={{
											fontFamily: 'var(--font-family-accent)',
										}}
									>
										{item.label}
									</span>
									<span className="mt-1 h-1 w-1 rounded-full bg-[#0f1828]" />
								</>
							) : (
								item.icon
							)}
						</Link>
					)
				})}
			</nav>
		</div>
	)
}
