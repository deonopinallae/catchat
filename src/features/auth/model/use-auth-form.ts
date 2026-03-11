import * as yup from 'yup'
import { useForm as useFormReact } from 'react-hook-form'
import { AuthDto } from './auth-types'
import { yupResolver } from '@hookform/resolvers/yup'

export const useAuthForm = () => {
	const schema = yup.object({
		phoneNumber: yup
			.string()
			.required('Phone number is required')
			.matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
	})

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useFormReact<AuthDto>({
		defaultValues: {
			phoneNumber: '',
		},
		mode: 'onChange',
		resolver: yupResolver(schema),
	})

	return { register, handleSubmit, reset, setValue, watch, errors, isSubmitting }
}
