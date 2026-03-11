'use client'

import { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { BackButton, Button, Input } from '@/shared/ui'
import {
	useUpdateUserProfileMutation,
	useUserStore,
} from '@/entities/user-profile/model/user-query'
import { RegistrationKeyboard } from '@/features/registration/ui/registration-keyboard'
import { BACKEND_UNAVAILABLE_MESSAGE, getApiErrorMessage } from '@/shared/lib/api-error'
import { useRegistrationStore } from '@/features/registration/model/registration-store'

export default function RegistrationPage() {
	const router = useRouter()
	const {
		firstName,
		lastName,
		activeField,
		isShiftActive,
		isNumberMode,
		saveError,
		setFirstName,
		setLastName,
		setActiveField,
		toggleShift,
		toggleNumberMode,
		setSaveError,
		appendCharacterToActiveField,
		backspaceInActiveField,
	} = useRegistrationStore()
	const { data: userProfile } = useUserStore()
	const { mutateAsync: updateUserProfile, isPending: isSavingProfile } =
		useUpdateUserProfileMutation()

	const handleCharacterPress = (character: string) => {
		setSaveError('')
		appendCharacterToActiveField(character)
	}

	const handleBackspace = () => {
		setSaveError('')
		backspaceInActiveField()
	}

	const handleReturn = () => {
		if (activeField === 'firstName') {
			setActiveField('lastName')
			return
		}
	}

	const handleInputChange =
		(field: 'firstName' | 'lastName') => (event: ChangeEvent<HTMLInputElement>) => {
			setSaveError('')
			if (field === 'firstName') {
				setFirstName(event.target.value)
				return
			}

			setLastName(event.target.value)
		}

	const handleSaveProfile = async () => {
		setSaveError('')

		if (!userProfile?.user) {
			setSaveError(getApiErrorMessage(null, BACKEND_UNAVAILABLE_MESSAGE))
			return
		}

		const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ')

		try {
			await updateUserProfile({
				data: {
					...userProfile.user,
					name: fullName || null,
				},
			})
		} catch (error) {
			setSaveError(getApiErrorMessage(error, BACKEND_UNAVAILABLE_MESSAGE))
		}
	}

	return (
		<div className="relative flex h-full w-full flex-col px-6 pt-[8.5rem]">
			<BackButton onClick={() => router.back()} />

			<div className="absolute left-12 top-[1.47rem] text-[1.125rem] leading-[1.875rem] font-semibold text-[#0f1828]">
				Your Profile
			</div>

			<div className="mx-auto relative mb-8 h-[6.25rem] w-[6.25rem] rounded-full bg-[#f7f7fc]">
				<div className="absolute inset-0 flex items-center justify-center text-[#0f1828]">
					<svg
						width="56"
						height="56"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
						/>
						<circle
							cx="12"
							cy="7"
							r="4"
							stroke="currentColor"
							strokeWidth="1.8"
						/>
					</svg>
				</div>
				<div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#0f1828] text-white text-sm font-semibold">
					+
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<Input
					type="text"
					placeholder="first name (required)"
					value={firstName}
					onFocus={() => setActiveField('firstName')}
					onChange={handleInputChange('firstName')}
					className="h-9 rounded bg-[#f7f7fc] px-2 py-[0.375rem] leading-6 font-semibold text-[#0f1828] placeholder:text-[#adb5bd]"
				/>
				<Input
					type="text"
					placeholder="last name (optional)"
					value={lastName}
					onFocus={() => setActiveField('lastName')}
					onChange={handleInputChange('lastName')}
					className="h-9 rounded bg-[#f7f7fc] px-2 py-[0.375rem] leading-6 font-semibold text-[#0f1828] placeholder:text-[#adb5bd]"
				/>
			</div>

			<Button
				type="button"
				onClick={handleSaveProfile}
				disabled={isSavingProfile}
				className="m-auto mt-8"
			>
				Save
			</Button>

			{saveError ? <p className="mx-auto mt-2 text-[red]">{saveError}</p> : null}

			<RegistrationKeyboard
				onCharacterPress={handleCharacterPress}
				onBackspace={handleBackspace}
				onSpace={() => handleCharacterPress(' ')}
				onReturn={handleReturn}
				onToggleNumbers={toggleNumberMode}
				onToggleShift={toggleShift}
				isShiftActive={isShiftActive}
				isNumberMode={isNumberMode}
			/>
		</div>
	)
}
