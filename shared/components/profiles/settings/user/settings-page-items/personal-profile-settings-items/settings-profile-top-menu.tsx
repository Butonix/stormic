'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const SettingsProfileTopMenu: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const topMenuButtons = [
		{
			id: 1,
			// text: formatMessage({ id: 'profileEditTopMenu.editProfile' }),
			text: 'Изменить профиль',
			path: '/settings/user/profile',
			disabled: false
		}
		// {
		// 	id: 2,
		// 	// text: formatMessage({ id: 'profileEditTopMenu.privacyAndReach' }),
		// 	text: 'Приватность и доступ',
		// 	path: '/settings/main#2',
		// 	disabled: true
		// },
		// {
		// 	id: 3,
		// 	// text: formatMessage({ id: 'profileEditTopMenu.verification' }),
		// 	text: 'Верификация ссылок',
		// 	path: '/settings/main#3',
		// 	disabled: true
		// }
	]

	return (
		<div className={cn('flex flex-1 rounded-md gap-1', className)}>
			{topMenuButtons.map(item => (
				<Button
					key={item.id}
					variant='secondary'
					type='button'
					disabled={item.disabled}
					className={cn(
						'h-12 flex-1 font-bold hover:bg-theme-hover/80 text-background hover:text-background rounded-xl',
						`${
							pathname === item.path
								? 'bg-theme-hover/80 hover:bg-theme-hover/80 text-background'
								: ''
						}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}
