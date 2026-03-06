'use client'
import Link from 'next/link'
import { Input } from '@/shared/ui/input'
import { SubmitHandler } from 'react-hook-form'
import { useAuthForm } from '../model/use-auth-form'
import { AuthDto, FormProps } from '../model/auth-types'
import { useState } from 'react'
import { Button, ErrorMessage } from '@/shared/ui'
import { LoadingMessage } from '@/shared/ui/loading-message'

export const AuthForm = ({ title, onSubmitAction, link }: FormProps) => {
	const [error, setError] = useState<string>('')

	const { register, handleSubmit, reset, errors, isSubmitting } = useAuthForm()

	const onSubmit: SubmitHandler<AuthDto> = async (data) => {
		setError('')
		try {
			await onSubmitAction(data)
			reset()
		} catch (err: any) {
			setError(err.message || 'Something went wrong')
		}
	}

	return (
		<form className='mx-auto' onSubmit={handleSubmit(onSubmit)}>
			<h1 className="mb-[1rem]">{title}</h1>

			<Input
				{...register('email')}
				placeholder="Email"
				type="email"
				className="mb-[0.63rem] mx-auto w-full max-w-[20.69rem]"
			/>
			{errors.email && <ErrorMessage errorMessage={errors.email.message} />}

			<Input
				{...register('password')}
				placeholder="Password"
				type="password"
				className="mb-[0.94rem] mx-auto w-full max-w-[20.69rem]"
			/>
			{errors.password && <ErrorMessage errorMessage={errors.password.message} />}

			{error && <div className="text-[red] mb-[0.5rem]">{error}</div>}

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? <LoadingMessage/> : 'Enter'}
			</Button>

			<Link
				href={link.url}
				className="absolute bottom-[1.69rem] left-1/2 -translate-x-1/2"
			>
				{link.name}
			</Link>
		</form>
	)
}
