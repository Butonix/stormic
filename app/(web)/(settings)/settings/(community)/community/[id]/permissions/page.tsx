import { User } from '@/payload-types'
import { SettingsCommunityPermissionsGroup } from '@/shared/components/profiles/settings/community/settings-community-permissions-group'
import { SettingsCommunityPermissionsTopMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-permissions-top-menu'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function CommunityPermissionsSettings() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (!currentUser) {
		return redirect('/not-auth')
	}

	const payload = await getPayload({ config: configPromise })

	const user = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 2
	})

	if (!user) {
		return redirect('/not-auth')
	}

	return (
		<>
			<SettingsCommunityPermissionsTopMenu />
			<SettingsCommunityPermissionsGroup data={user} />
		</>
	)
}
