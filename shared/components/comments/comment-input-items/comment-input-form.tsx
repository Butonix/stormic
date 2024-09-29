import type { Comment } from '@/shared/components/comments/comment-full-post-group';
import { FormTextarea } from '@/shared/components/form';
import { cn } from '@/shared/lib/utils';
import { ListFilter } from 'lucide-react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
	postId: number;
	commentsHeader: string;
	className?: string;
	onCommentAdded: (newComment: Comment) => void;
}

export const CommentInputForm: React.FC<Props> = ({ postId, commentsHeader, className, onCommentAdded }) => {
	const { formatMessage } = useIntl();
	const [newComment, setNewComment] = useState('');
	
	const handleAddComment = async () => {
		if (!newComment.trim()) return;
		
		const response = await fetch(`/api/posts/${postId}/comments/post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: newComment,
				post_id: postId,
			}),
		});
		
		if (response.ok) {
			const addedComment: Comment = await response.json();
			setNewComment(''); // Очищаем поле ввода
			onCommentAdded(addedComment);
		} else {
			console.error('Не удалось добавить комментарий');
		}
	};
	
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleAddComment();
		}
	};
	
	return (
		<div className={cn('', className)}>
			<div className='flex justify-between items-center'>
				{commentsHeader > String(0) ? (
					<p className='pl-1 text-lg cursor-default'>
						{commentsHeader} {formatMessage({ id: 'commentInputForm.commentsHeaderCount' })}
					</p>
				) : (
					<p className='pl-1 text-lg cursor-default'>
						{formatMessage({ id: 'commentInputForm.commentsHeaderEmpty' })}
					</p>
				)}
				<div className='group'>
					<p className='flex items-center group-hover:text-blue-600 font-bold'>
						<ListFilter className='group-hover:bg-blue-600/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer' />
					</p>
				</div>
			</div>
			<FormTextarea
				name='comment'
				className='text-base mt-2'
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={formatMessage({ id: 'commentInputForm.textareaPlaceholder' })}
				rows={5}
				sideButton={true}
				onClickValue={handleAddComment}
			/>
		</div>
	);
};
