import { User } from '@/payload-types'
import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { UserNotFound } from '@/shared/components/info-blocks/user-not-found'
import { SettingsCommunityMainGroup } from '@/shared/components/profiles/settings/community/main/settings-community-main-group'
import { SettingsCommunityMainTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-main-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
	title: 'Сообщество: Настройки'
}

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function CommunityMainSettings({ params: paramsPromise }: PageProps) {
	const { id = null } = await paramsPromise
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/')
	}

	const payload = await getPayload({ config: configPromise })

	const community = await queryCommunityById({ id })

	if (!community) {
		return <CommunityNotFound />
	}

	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 2
	})

	if (!user) {
		return <UserNotFound />
	}

	return (
		<>
			<SettingsCommunityMainTopMenu data={community} />
			<SettingsCommunityMainGroup community={community} />
		</>
	)
}

const queryCommunityById = cache(async ({ id }: { id: string | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const community = await payload.findByID({
		collection: 'communities',
		id: id,
		depth: 2
	})

	return community || null
})
