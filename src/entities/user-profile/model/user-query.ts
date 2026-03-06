'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserProfile, updateUserProfile } from '../api/user-repository'
import { useAuthStore } from '@/features/auth/model/auth-store'
import { UserDto } from './user-types'

export const useUserStore = () => {
	const accessToken = useAuthStore((state) => state.accessToken)
	const isHydrated = useAuthStore((state) => state.isHydrated)

	return useQuery({
		queryKey: ['userPublic'],
		queryFn: getUserProfile,
		enabled: isHydrated && Boolean(accessToken),
	})
}

export const useUpdateUserProfileMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['userProfile'],
		mutationFn: ({ data }: { data: UserDto }) => updateUserProfile(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userPublic'], exact: true })
		},
	})
}
