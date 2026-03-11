import { create, StateCreator } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface StoreOptions<T extends object> {
	persist?: {
		name: string
		partialize?: (state: T) => Partial<T>
		onRehydrateStorage?: () => (state?: T, error?: unknown) => void
	}
	devtools?: boolean
}

export function createStore<T extends object>(
	store: StateCreator<T>,
	options?: StoreOptions<T>,
) {
	let base = store as StateCreator<T, [], []>

	if (options?.persist) {
		base = persist(base, {
			...options.persist,
			onRehydrateStorage: options.persist.onRehydrateStorage || (() => () => {}),
		}) as unknown as StateCreator<T, [], []>
	}

	if (options?.devtools) {
		base = devtools(base, {
			enabled: true,
		}) as unknown as StateCreator<T, [], []>
	}

	return create<T>(base)
}
