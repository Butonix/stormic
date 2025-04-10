import { Community, Post, User } from '@/payload-types'
import { CommunityBan } from '@/shared/components/info-blocks/community-ban'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { CommunityProfileGroup } from '@/shared/components/profiles/community-profile-group'
import { getSession } from '@/shared/lib/auth'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getUserPermissions } from '@/shared/lib/getUserPermissions'
import { Permissions } from '@/shared/lib/permissions'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { cache } from 'react'

type Args = {
	params: {
		id?: number
	}
}

export default async function Community({ params: paramsPromise }: Args) {
	const { id = null } = await paramsPromise
	const community = await queryCommunityById({ id })

	if (!community) {
		return <CommunityNotFound />
	}

	const session = (await getSession()) as { user: User } | null
	const currentUser = session?.user
	const payload = await getPayload({ config: configPromise })

	const hostCommunityBan = await payload.find({
		collection: 'hostCommunitiesBans',
		where: {
			community: {
				equals: community.id
			}
		},
		pagination: false,
		overrideAccess: true
	})

	const permissions = currentUser
		? await getUserPermissions(currentUser.id, community.id)
		: null

	if (hostCommunityBan.docs.length !== 0) {
		return <CommunityBan />
	}

	const result = await payload.find({
		collection: 'posts',
		where: {
			_status: {
				equals: 'published'
			},
			hasDeleted: {
				equals: false
			},
			community: {
				equals: id
			}
		},
		pagination: false,
		overrideAccess: true,
		depth: 2
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		pagination: false,
		overrideAccess: true
	})

	const posts = result.docs as Post[]
	const communities = resultCommunities.docs as Community[]

	const postPermissions: Record<number, Permissions | null> = {}
	if (currentUser) {
		await Promise.all(
			posts.map(async post => {
				const communityId =
					post.community && typeof post.community === 'object'
						? post.community.id
						: null
				postPermissions[post.id] = communityId
					? await getUserPermissions(currentUser.id, communityId)
					: null
			})
		)
	}

	return (
		<>
			<CommunityProfileGroup
				community={community}
				permissions={permissions || null}
				posts={posts}
				communities={communities}
				postPermissions={postPermissions}
				className='mt-4'
			/>
		</>
	)
}

export async function generateMetadata({
	params: paramsPromise
}: Args): Promise<Metadata> {
	const { id = null } = await paramsPromise
	const community = await queryCommunityById({ id })

	return generateMeta({ doc: community })
}

const queryCommunityById = cache(async ({ id }: { id: number | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const community = await payload.findByID({
		collection: 'communities',
		id: id,
		depth: 2
	})

	return community || null
})
