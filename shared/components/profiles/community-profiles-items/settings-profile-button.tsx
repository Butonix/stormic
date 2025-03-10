'use client'

import React from 'react'
// import { useIntl } from 'react-intl'
import { Community, User } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import { Settings } from 'lucide-react'
import { SettingsCommunityModal } from '../../modals/communities/settings'

interface Props {
	data: User | Community
	currentUser: User
	hasUser: boolean
	className?: string
}

export const SettingsProfileButton: React.FC<Props> = ({
	data,
	currentUser,
	hasUser,
	className
}) => {
	// const { formatMessage } = useIntl()
	const [openSettingsCommunityModal, setOpenSettingsCommunityModal] =
		React.useState(false)

	return (
		<div className={cn('', className)}>
			{!hasUser && (
				<SettingsCommunityModal
					data={data as Community}
					open={openSettingsCommunityModal}
					onClose={() => setOpenSettingsCommunityModal(false)}
				/>
			)}

			{!hasUser && (
				<Settings
					className='hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer'
					onClick={() => setOpenSettingsCommunityModal(true)}
				/>
			)}
		</div>
	)
}
