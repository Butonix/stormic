'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const SettingsHostMainTopMenu: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const topMenuButtons = [
		{
			id: 1,
			// text: formatMessage({ id: 'profileEditTopMenu.editProfile' }),
			text: 'Платформа',
			path: '/settings/host/main/platform',
			disabled: false
		},
		{
			id: 2,
			// text: formatMessage({ id: 'profileEditTopMenu.privacyAndReach' }),
			text: 'Навигация',
			path: '/settings/host/main/navigation',
			disabled: false
		},
		{
			id: 3,
			// text: formatMessage({ id: 'profileEditTopMenu.verification' }),
			text: 'Социальные сети',
			path: '/settings/host/main/social',
			disabled: false
		}
	]

	return (
		<div className={cn('flex flex-1 rounded-md gap-1', className)}>
			{topMenuButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					disabled={item.disabled}
					className={cn(
						'h-12 flex-1 text-md font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white',
						`${
							pathname === item.path
								? 'bg-blue-800 hover:bg-blue-800 text-white'
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
