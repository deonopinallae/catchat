import * as yup from 'yup'
import { useForm as useFormReact } from 'react-hook-form'
import { AuthDto } from './auth-types'
import { yupResolver } from '@hookform/resolvers/yup'

export const useAuthForm = () => {
	const schema = yup.object({
		email: yup
			.string()
			.required('Email is required')
			.matches(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format'),
		password: yup
			.string()
			.required('Password is required')
			.matches(/^[\w#%]+$/, 'Password can contain only letters, numbers and #,%')
			.min(6, 'Minimum 6 characters')
			.max(20, 'Maximum 20 characters'),
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useFormReact<AuthDto>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
		resolver: yupResolver(schema),
	})

	return { register, handleSubmit, reset, errors, isSubmitting }
}
