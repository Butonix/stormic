'use client'

import { HostSetting } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/shared/components/ui/accordion'
import { cn } from '@/shared/lib/utils'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

// interface User {
// 	id: number;
// 	fullName: string;
// 	profile_picture: string | null;
// 	email: string;
// 	role: string;
// 	bio: string | null;
// }

interface Props {
	hostInfo: HostSetting
	hasOwner?: boolean
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const AboutPage: React.FC<Props> = ({
	hostInfo,
	hasOwner,
	className
}) => {
	const router = useRouter()
	// const { formatMessage } = useIntl()

	if (!hostInfo.owner) {
		return <div>Owner not found</div>
	}

	const truncatedName = truncateText(hostInfo.owner?.name || '', 20)
	const truncatedDescription = truncateText(
		hostInfo.owner?.description || '',
		24
	)

	return (
		<div className={cn('', className)}>
			<div className='w-full mt-4'>
				<span className='flex text-2xl font-extrabold justify-center'>
					{process.env.NEXT_PUBLIC_BASE_URL}
				</span>
				<p className='flex justify-center mt-4 text-xl'>
					{/* {formatMessage({ id: 'aboutPage.socialPlatform' })} */}
					социальная платформа на базе{' '}
					<Link
						href='https://stormic.app/about/'
						className='text-a-color hover:text-a-color-hover ml-1 font-extrabold'
					>
						Stormic
					</Link>
				</p>
			</div>

			{hasOwner && (
				<div className='flex gap-2 w-full items-center justify-between bg-secondary p-1 mt-6 rounded-md'>
					<div className='flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto'>
						<Settings
							className='hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
							onClick={() => router.push('/settings/host/main')}
						/>
					</div>
				</div>
			)}

			<div className='h-full w-full flex bg-secondary rounded-md p-4 mt-6'>
				<div className='w-1/2'>
					<p className='uppercase font-semibold'>
						{/* {formatMessage({ id: 'aboutPage.managed' })} */}
						Управляется
					</p>
					<Link href={'/u/' + hostInfo.owner?.id}>
						<div className='flex gap-2 mt-2 items-center'>
							<ProfileAvatar
								className='w-14 h-14 border-none bg-secondary hover:bg-secondary'
								avatarImage={String(hostInfo.owner?.avatar?.url || '')}
								avatarSize={Number(54)}
							/>
							<div className='flex h-full my-auto'>
								<div>
									<p className='font-semibold text-md'>{truncatedName}</p>
									<p className='-mt-2 text-gray-400 text-sm font-semibold'>
										{truncatedDescription}
									</p>
								</div>
							</div>
						</div>
					</Link>

					<div className=''></div>
				</div>
				<div className='w-1/2 border-l-2 border-l-blue-700 pl-4'>
					<p className='uppercase font-semibold'>
						{/* {formatMessage({ id: 'aboutPage.contacts' })} */}
						Контакты
					</p>
					<div className='h-full'>
						<p className='font-semibold mt-4'>{hostInfo.contacts}</p>
					</div>
				</div>
			</div>

			<Accordion
				className='mt-4 px-4 rounded-md bg-secondary'
				type='single'
				defaultValue='about'
				collapsible
			>
				<AccordionItem value='about'>
					<AccordionTrigger>
						{/* {formatMessage({ id: 'aboutPage.about' })} */}О Проекте
					</AccordionTrigger>
					<AccordionContent className='text-base'>
						{hostInfo.description}
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<Accordion
				className='mt-4 px-4 rounded-md bg-secondary'
				type='single'
				defaultValue='about'
				collapsible
			>
				<p className='pt-4 text-base'>Правила</p>
				{hostInfo.rules?.map((item, index) => (
					<AccordionItem key={index} value={`key-${index}`}>
						<AccordionTrigger>
							{/* {formatMessage({ id: 'aboutPage.rules' })} */}
							{`${index + 1}. ${item.nameRule}`}
						</AccordionTrigger>
						<AccordionContent className='text-base'>
							{item.descriptionRule}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}
