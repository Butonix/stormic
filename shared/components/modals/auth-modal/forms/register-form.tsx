'use client'

import { registerUser } from '@/app/actions'
import { FormInput } from '@/shared/components/form/'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'
import { formRegisterSchema, TFormRegisterValues } from './schemas'

interface Props {
	onClose?: VoidFunction
	onClickLogin?: VoidFunction
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
	const { formatMessage } = useIntl()
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: ''
		}
	})
	
	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password
			})
			
			toast.success(String(formatMessage({ id: 'registerForm.toastSuccess' })), {
				icon: '✅'
			})
			
			onClose?.()
		} catch (error) {
			return toast.error(String(formatMessage({ id: 'registerForm.toastError' })), {
				icon: '❌'
			})
		}
	}
	
	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput
					name='email'
					label={formatMessage({ id: 'registerForm.formInputEmailLabel' })}
					placeholder='user@stormic.app'
					required
				/>
				<FormInput
					name='fullName'
					label={formatMessage({ id: 'registerForm.formInputNameLabel' })}
					placeholder='Stormhead'
					required
				/>
				<FormInput
					name='password'
					label={formatMessage({ id: 'registerForm.formInputPassLabel' })}
					type='password'
					placeholder='********'
					required />
				<FormInput
					name='confirmPassword'
					label={formatMessage({ id: 'registerForm.formInputConfirmPassLabel' })}
					type='password'
					placeholder='********'
					required
				/>
				
				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
					type='submit'
				>
					{formatMessage({ id: 'registerForm.regButton' })}
				</Button>
			</form>
		</FormProvider>
	)
}
