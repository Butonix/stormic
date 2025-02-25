import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { LivePreviewListener } from '@/shared/components/LivePreviewListener'
import { FullPostPage } from '@/shared/components/posts/full-post-page'
import { generateMeta } from '@/shared/lib/generateMeta'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import PageClient from './page.client'

// export async function generateStaticParams() {
// 	const payload = await getPayload({ config: configPromise })
// 	const posts = await payload.find({
// 		collection: 'posts',
// 		draft: false,
// 		limit: 1000,
// 		overrideAccess: false,
// 		pagination: false,
// 		select: {
// 			id: true,
// 		},
// 	})
//
// 	const params = posts.docs.map(({ id }) => {
// 		return { id }
// 	})
//
// 	return params
// }

type Args = {
	params: Promise<{
		id?: number
	}>
}

export default async function Post({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode()
	const { id = null } = await paramsPromise
	// const url = '/p/' + id
	const post = await queryPostById({ id })

	if (!post) {
		return <PostNotFound />
	}

	return (
		<article>
			<PageClient />
			{draft && <LivePreviewListener />}
			<div className='flex flex-col h-[91vh] overflow-auto no-scrollbar rounded-md'>
				<FullPostPage post={post} />
			</div>
		</article>
	)
}

export async function generateMetadata({
	params: paramsPromise
}: Args): Promise<Metadata> {
	const { id = null } = await paramsPromise
	const post = await queryPostById({ id })

	return generateMeta({ doc: post })
}

const queryPostById = cache(async ({ id }: { id: number | null }) => {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
		draft,
		limit: 1,
		overrideAccess: draft,
		pagination: false,
		where: {
			id: {
				equals: id
			}
		}
	})

	return result.docs?.[0] || null
})
