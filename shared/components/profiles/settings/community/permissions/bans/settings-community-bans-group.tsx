'use client'

import {
	Community,
	CommunityUsersBan,
	FollowCommunity,
	User
} from '@/payload-types'
import { CommunityUsersBansModal } from '@/shared/components/modals/community-users-bans-modal'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { CircleUser, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useState } from 'react'

interface Props {
	data: Community
	currentUser: User
	communityUsers: FollowCommunity[]
	communityUsersBans: CommunityUsersBan[]
}

export const SettingsCommunityBansGroup: React.FC<Props> = ({
	data,
	currentUser,
	communityUsers,
	communityUsersBans
}) => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [openAddUserModal, setOpenAddUserModal] = useState(false)

	// Фильтрация забаненных пользователей по поисковому запросу
	const filteredBans = communityUsersBans.filter(ban => {
		const user = ban.user as User
		return user.name.toLowerCase().includes(searchTerm.toLowerCase())
	})

	// Функция для разбана пользователя
	const handleSubmitDeleteBan = async (banId: number) => {
		try {
			const stringifiedQuery = qs.stringify(
				{
					where: {
						id: { equals: banId },
						community: { equals: data.id }
					}
				},
				{ addQueryPrefix: true }
			)
			const req = await fetch(`/api/communityUsersBans${stringifiedQuery}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (req.ok) {
				router.refresh()
			}
		} catch (err) {
			console.log('Ошибка при разбане пользователя:', err)
		}
	}

	return (
		<div className='mt-4'>
			<div className='command-container'>
				<div className='flex gap-2'>
					<Input
						type='text'
						placeholder='Поиск заблокированных участников...'
						className='h-10 w-full px-2 rounded-md bg-gray-700'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<CommunityUsersBansModal
						open={openAddUserModal}
						onClose={() => setOpenAddUserModal(false)}
						currentUser={currentUser}
						communityUsers={communityUsers}
						communityId={data.id}
						bannedUsers={communityUsersBans.map(ban => (ban.user as User).id)}
					/>
					<Button
						variant='blue'
						onClick={() => setOpenAddUserModal(true)}
						className='px-6'
					>
						Заблокировать
					</Button>
				</div>
				<div className='mt-2'>
					{filteredBans.length === 0 ? (
						<div className='p-2 text-gray-500'>
							Заблокированные участники не найдены
						</div>
					) : (
						<div className='flex flex-col'>
							{filteredBans.map(ban => {
								const user = ban.user as User
								const avatarImageUrl =
									typeof user === 'object'
										? getMediaUrl(user.avatar, 'square', '/logo.png')
										: '/logo.png'
								return (
									<div
										key={ban.id}
										className='flex w-full px-2 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md mt-2 items-center justify-between'
									>
										<div className='flex w-11/12'>
											<div className='w-full flex justify-items-start items-center gap-2 bg-transparent text-primary'>
												<Avatar className='rounded-full'>
													<AvatarImage
														className='m-auto rounded-full'
														src={avatarImageUrl}
														style={{ width: 34, height: 34 }}
													/>
													<AvatarFallback>
														<CircleUser />
													</AvatarFallback>
												</Avatar>
												<span>{user.name}</span>
											</div>
										</div>
										<div className='group -my-7 w-1/12'>
											<p className='flex p-1 items-center justify-end group-hover:text-blue-700 font-bold'>
												<X
													className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
													onClick={async () => {
														try {
															await handleSubmitDeleteBan(ban.id)
														} catch (error) {
															console.error(
																'Ошибка при разбане пользователя:',
																error
															)
														}
													}}
												/>
											</p>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
