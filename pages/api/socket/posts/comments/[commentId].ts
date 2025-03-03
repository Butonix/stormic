import { NextApiResponseServerIo } from '@/@types/socket'
import { getPagesSession } from '@/shared/lib/pagesAuth'
import configPromise from '@payload-config'
import { NextApiRequest } from 'next'
import { getPayload } from 'payload'
import { cache } from 'react'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo
) {
	if (req.method !== 'DELETE' && req.method !== 'PATCH') {
		return res.status(405).json({ error: 'Method запрещен' })
	}
	try {
		const profile = await getPagesSession(req, res)
		const postId = Number(req.query.postId)
		const commentId = Number(req.query.commentId)
		const { content } = req.body
		const payload = await getPayload({ config: configPromise })

		if (!profile) {
			return res.status(401).json({ error: 'Не авторизован' })
		}

		if (!commentId) {
			return res.status(400).json({ error: 'Comment ID не найден' })
		}

		if (!postId) {
			return res.status(400).json({ error: 'Post ID не найден' })
		}

		const post = await queryPostById({ postId })

		if (!post) {
			return res.status(404).json({ error: 'Post не найден' })
		}

		let comment = await queryCommentById({ commentId })

		const isMessageOwner =
			Number(comment?.author?.id) === Number(profile?.user.id)

		const isOwner =
			Array.isArray(profile?.user.systemRoles) &&
			profile.user.systemRoles.includes('owner')

		// const isAdmin =
		// 	Array.isArray(profile?.user.userRoles) &&
		// 	profile.user.userRoles.some(role => role.roleType === 'admin')

		// const isModerator =
		// 	Array.isArray(profile?.user.userRoles) &&
		// 	profile.user.userRoles.some(role => role.roleType === 'moderator')

		const canModify = isMessageOwner || isOwner

		if (!canModify) {
			return res.status(401).json({ error: 'Не авторизован' })
		}

		if (req.method === 'DELETE') {
			comment = await payload.update({
				collection: 'comments',
				data: {
					content: 'Комментарий был удален',
					hasDeleted: true
				},
				// file: null,
				where: {
					id: {
						equals: commentId
					}
				}
			})
		}

		if (req.method === 'PATCH') {
			if (!isMessageOwner) {
				return res.status(401).json({ error: 'Не авторизован' })
			}

			comment = await payload.update({
				collection: 'comments',
				data: {
					content
				},
				where: {
					id: {
						equals: commentId
					}
				}
			})
		}

		const updateKey = `chat:${postId}:messages:update`
		res?.socket?.server?.io?.emit(updateKey, comment)

		const globalUpdateKey = `global:comments:update`
		res?.socket?.server?.io?.emit(globalUpdateKey, comment)

		return res.status(200).json(comment)
	} catch (error) {
		console.log('[MESSAGE_ID]', error)
		return res.status(500).json({ error: 'Ошибка сервера' })
	}
}

const queryPostById = cache(async ({ postId }: { postId: number }) => {
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
		where: {
			id: {
				equals: postId
			}
		}
	})
	return result.docs?.[0] || null
})

const queryCommentById = cache(async ({ commentId }: { commentId: number }) => {
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'comments',
		where: {
			id: {
				equals: commentId
			}
		}
	})
	return result.docs?.[0] || null
})
