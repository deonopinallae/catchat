'use client'

import { createStore } from '@/shared/lib/create-store'

type ActiveRegistrationField = 'firstName' | 'lastName'

interface RegistrationStore {
	firstName: string
	lastName: string
	activeField: ActiveRegistrationField
	isShiftActive: boolean
	isNumberMode: boolean
	saveError: string
	setFirstName: (value: string) => void
	setLastName: (value: string) => void
	setActiveField: (field: ActiveRegistrationField) => void
	toggleShift: () => void
	toggleNumberMode: () => void
	setSaveError: (value: string) => void
	appendCharacterToActiveField: (character: string) => void
	backspaceInActiveField: () => void
}

export const useRegistrationStore = createStore<RegistrationStore>((set, get) => ({
	firstName: '',
	lastName: '',
	activeField: 'firstName',
	isShiftActive: true,
	isNumberMode: false,
	saveError: '',
	setFirstName: (value) => set({ firstName: value }),
	setLastName: (value) => set({ lastName: value }),
	setActiveField: (field) => set({ activeField: field }),
	toggleShift: () => set((state) => ({ isShiftActive: !state.isShiftActive })),
	toggleNumberMode: () => set((state) => ({ isNumberMode: !state.isNumberMode })),
	setSaveError: (value) => set({ saveError: value }),
	appendCharacterToActiveField: (character) => {
		const { activeField } = get()
		if (activeField === 'firstName') {
			set((state) => ({ firstName: `${state.firstName}${character}` }))
			return
		}

		set((state) => ({ lastName: `${state.lastName}${character}` }))
	},
	backspaceInActiveField: () => {
		const { activeField } = get()
		if (activeField === 'firstName') {
			set((state) => ({ firstName: state.firstName.slice(0, -1) }))
			return
		}

		set((state) => ({ lastName: state.lastName.slice(0, -1) }))
	},
}))
