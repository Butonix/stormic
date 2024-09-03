'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'
import { Title } from '../../title'

interface Props {
	title: string
	text: string
	className?: string
	imageUrl?: string
}

export const InfoBlock: React.FC<Props> = ({
	                                           className,
	                                           title,
	                                           text,
	                                           imageUrl
                                           }) => {
	const { formatMessage } = useIntl()
	return (
		<div
			className={cn('m-auto max-w-[440px]', className)}
		>
			<div className='flex flex-col'>
				<div className='w-full'>
					<div className='flex '>
						<Title size='lg' text={title} className='font-extrabold mx-auto' />
					</div>
					<div className='flex '>
						<p className='text-gray-400 text-lg mx-auto'>{text}</p>
					</div>
				</div>
				
				<div className='flex w-full justify-around mt-4'>
					<Link href='/public'>
						<Button
							variant='blue'
							className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
						>
							<ArrowLeft size={18} />
							{formatMessage({ id: 'infoBlock.home' })}
						</Button>
					</Link>
					<a href=''>
						<Button
							variant='blue'
							className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
						>
							{formatMessage({ id: 'infoBlock.reloadPage' })}
						</Button>
					</a>
				</div>
			</div>
			<div className='flex w-full mt-2'>
				<img className='mx-auto' src={imageUrl} alt={title} width={200} />
			</div>
		</div>
	)
}