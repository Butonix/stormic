'use client'

import { Community, User } from '@/payload-types'
import { AuthModal } from '@/shared/components/modals'
import { WriteModal } from '@/shared/components/modals/write-modal'
import React from 'react'
// import { useIntl } from 'react-intl'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

interface Props {
	authorId: number
	authorAvatar: string
	authorName: string
	authorUrl: string
	communities: Community[]
	stormicName: string
	logoImage?: string
	authImage?: string
	hasSession: boolean
	className?: string
}

export const NewPostButton: React.FC<Props> = ({
	authorId,
	authorAvatar,
	authorName,
	authorUrl,
	communities,
	logoImage,
	authImage,
	stormicName,
	hasSession,
	className
}) => {
	// const { formatMessage } = useIntl()
	const [openWriteModal, setOpenWriteModal] = React.useState(false)
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	return (
		<div className={cn('', className)}>
			<WriteModal
				open={openWriteModal}
				onClose={() => setOpenWriteModal(false)}
				authorId={authorId}
				authorAvatar={authorAvatar}
				authorName={authorName}
				authorUrl={authorUrl}
				communities={communities}
			/>

			<AuthModal
				open={openAuthModal}
				onClose={() => setOpenAuthModal(false)}
				logoImage={logoImage}
				authImage={authImage}
				stormicName={stormicName}
			/>

			<Button
				variant='blue'
				className='h-12 w-full text-lg font-bold'
				type='button'
				onClick={
					hasSession
						? () => setOpenWriteModal(true)
						: () => setOpenAuthModal(true)
				}
			>
				{/* {formatMessage({ id: 'newPostButton' })} */}
				Новый пост
			</Button>
		</div>
	)
}
