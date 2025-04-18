import { Community, User } from '@/payload-types'
import {
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	SideFooter,
	SocialMenu
} from '@/shared/components/'
import { CommentFeedGroup } from '@/shared/components/comments/comment-feed-group'
import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
import { NewPostButton } from '@/shared/components/new-post-button'
import { getSession } from '@/shared/lib/auth'
import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic Community'
}

export default async function MainLayout({
	children
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	const payload = await getPayload({ config })

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1
	})

	const globalSideBarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation',
		depth: 1,
		select: {
			items: true
		}
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		depth: 2,
		pagination: false,
		overrideAccess: false
	})

	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-[calc(100vh-6rem)] overflow-auto no-scrollbar'>
						<FeedUserMenu />
						<SocialMenu className='my-2' />

						<NewPostButton
							host={resultGlobalHost}
							communities={communities}
							currentUser={currentUser !== null ? currentUser : undefined}
							className='my-4'
						/>
						<NavigationMenuForm
							className='mt-4'
							data={globalSideBarNavigation}
						/>
						<CommunitiesForm
							// title={formatMessage({ id: 'categoryGroup.communitiesPageLink' })}
							title={'Сообщества'}
							limit={5}
							defaultItems={communities.slice(0, 5)}
							items={communities}
							// loading={loading}
							className='mt-4'
							hasPost={false}
						/>
						<SideFooter className='mt-4' />
					</div>
					{/* Центральная часть */}
					<div className='w-2/4 h-[calc(100vh-6rem)] overflow-auto no-scrollbar rounded-md'>
						{children}
					</div>

					{/* Правая часть */}
					<div className='w-1/4 h-[calc(100vh-6rem)] overflow-auto no-scrollbar rounded-md'>
						<CommentFeedGroup />
					</div>
				</div>
			</Container>
		</>
	)
}
