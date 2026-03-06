'use client'
import { createStore } from '@/shared/lib/create-store'

interface ModalStore {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useModalStore = createStore<ModalStore>((set, get) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
}))
