
export interface UserDto {
	id: string
	email: string
	name: string | null
	createdAt: string
}

export interface UserProfileResponse {
	user: UserDto
}

export interface UserStateTypes extends UserProfileResponse {
	setUserProfile: (data: UserProfileResponse) => void
}