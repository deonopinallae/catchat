import { create, StateCreator } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface StoreOptions {
	persist?: {
		name: string
		partialize?: (state: any) => any
		onRehydrateStorage?: () => (state?: any, error?: unknown) => void
	}
	devtools?: boolean
}

export function createStore<T extends object>(
	store: StateCreator<T>,
	options?: StoreOptions,
) {
	let base: StateCreator<any, any, any> = store

	if (options?.persist) {
		base = persist(store, {
			...options.persist,
			onRehydrateStorage: options.persist.onRehydrateStorage || (() => () => {}),
		})
	}

	if (options?.devtools) {
		base = devtools(base, { enabled: true })
	}

	return create<T>(base)
}
