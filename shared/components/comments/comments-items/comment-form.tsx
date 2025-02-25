'use client'

import { CommentItem } from '@/shared/components/comments/comments-items/comment-item'
import { useCommentQuery } from '@/shared/hooks/use-comment-query'
import { useCommentScroll } from '@/shared/hooks/use-comment-scroll'
import { UseGlobalCommentSocket } from '@/shared/hooks/use-global-comment-socket'
import { cn } from '@/shared/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { ElementRef, useRef } from 'react'

interface CommentFormProps {
	maxLengthHeader?: number
	maxLengthBody?: number
	apiUrl: string
	paramKey: 'postId' | 'conversationId' | 'global'
	paramValue: string
	className?: string
}

export const CommentForm: React.FC<CommentFormProps> = ({
	maxLengthHeader,
	maxLengthBody,
	apiUrl,
	paramKey,
	paramValue,
	className
}) => {
	const queryKey = 'global:comments'
	const globalUpdateKey = `global:comments:update`

	const chatRef = useRef<ElementRef<'div'>>(null)
	const bottomRef = useRef<ElementRef<'div'>>(null)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useCommentQuery({
			queryKey,
			apiUrl,
			paramKey,
			paramValue
		})

	UseGlobalCommentSocket(queryKey, globalUpdateKey)

	useCommentScroll({
		chatRef,
		bottomRef,
		loadMore: fetchNextPage,
		shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
		count: data?.pages?.[0]?.items?.length ?? 0
	})

	if (status === 'pending') {
		return (
			<div className='flex flex-col flex-1 justify-center items-center'>
				<Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
				<p className='text-xs text-zinc-500 dark:text-zinc-400'>
					Загрузка комментариев...
				</p>
			</div>
		)
	}
	console.log(data)
	return (
		<div ref={chatRef} className={cn('', className)}>
			{data.map((message: any) => (
				<CommentItem
					key={message.comment_id}
					postTitle={message.postTitle}
					content={message.content}
					postId={message.post_id}
					authorName={message.author_fullName}
					authorId={message.author_id}
					authorAvatar={message.author_profile_picture}
					maxLengthHeader={maxLengthHeader}
					maxLengthBody={maxLengthBody}
					fileUrl={message.fileUrl}
					deleted={message.deleted}
					className='bg-secondary/25 hover:bg-primary/5 mt-4'
				/>
			))}
			<div ref={bottomRef} />
		</div>
	)
}
