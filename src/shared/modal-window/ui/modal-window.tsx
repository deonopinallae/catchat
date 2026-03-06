'use client'
import styles from './styles.module.scss'
import { Button } from '@/shared/ui'
import { ReactNode } from 'react'
import { useModalStore } from '../model/modal-window-store'

interface ModalWindowProps {
	title: string
	onSubmit: () => void
	children: ReactNode
	submitDisabled?: boolean
}

export const ModalWindow = ({
	title,
	onSubmit,
	children,
	submitDisabled = false,
}: ModalWindowProps) => {
	const isOpen = useModalStore(({ isOpen }) => isOpen)
	const close = useModalStore(({ close }) => close)

	const onClick = () => {
		onSubmit()
		close()
	}

	if (!isOpen) return
	return (
		<>
			<div onClick={close} className="absolute inset-0 bg-[rgba(0,0,0,0.42)] z-10">
				<div onClick={(e) => e.stopPropagation()} className={styles.modalWindow}>
					<h2 className="mb-[1.06rem]">{title}</h2>
					{children}
					<Button
						disabled={submitDisabled}
						type="submit"
						onClick={onClick}
						className="mt-[3.31rem] mx-auto px-[2.75rem] py-[0.56rem]"
					>
						ok
					</Button>
				</div>
			</div>
		</>
	)
}
