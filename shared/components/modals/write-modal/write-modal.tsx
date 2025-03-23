'use client'

import { Community } from '@/payload-types'
import PlaygroundEditorTheme from '@/shared/components/lexical/themes/PlaygroundEditorTheme'
import { PostWriteHeader } from '@/shared/components/post-write/items/post-write-header'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Maximize2, Minimize2 } from 'lucide-react'
import React, { useState } from 'react'
import { SharedHistoryContext } from '../../lexical/context/SharedHistoryContext'
import { ToolbarContext } from '../../lexical/context/ToolbarContext'
import Editor from '../../lexical/Editor'
import PlaygroundNodes from '../../lexical/nodes/PlaygroundNodes'
import { FormInput } from '../../form'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formTitleSchema, TFormTitleValues } from './schemas'
import { useCurrentTime } from '@/shared/hooks/useCurrentTime'

interface Props {
	authorId: number
	authorAvatar: string
	authorName: string
	communities: Community[]
	authorUrl: string
	open: boolean
	onClose: () => void
}

const EditorWithContext: React.FC<{
	onSave: (content: any) => void
	isFullScreen: boolean
}> = ({ onSave, isFullScreen }) => {
	const [editor] = useLexicalComposerContext()

	const handleSave = () => {
		const editorState = editor.getEditorState()
		const jsonState = editorState.toJSON()
		onSave(jsonState)
	}

	return (
		<>
			<div
				className={`max-w-[74rem] my-2 ${
					isFullScreen
						? 'min-w-[71rem] min-h-[68rem]'
						: 'min-w-[71rem] min-h-[44rem]'
				}`}
			>
				<Editor />
			</div>
			<Button onClick={handleSave} variant='blue' className='my-4 px-4 py-2'>
				Опубликовать
			</Button>
		</>
	)
}

export const WriteModal: React.FC<Props> = ({
	authorId,
	authorAvatar,
	authorName,
	communities,
	authorUrl,
	open,
	onClose
}) => {
	const form = useForm<TFormTitleValues>({
		resolver: zodResolver(formTitleSchema),
		defaultValues: {
			title: ''
		}
	})

	const [isFullScreen, setIsFullScreen] = useState(false)

	const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(
		null
	)

	const currentTime = useCurrentTime()

	const handleToggleSize = () => {
		setIsFullScreen(!isFullScreen)
	}

	const handleSave = async (content: any) => {
		if (!content?.root?.children?.length) {
			console.error('Контент пустой')
			return
		}

		const { title } = form.getValues()

		const postData = {
			title: title,
			author: authorId,
			community: selectedCommunityId,
			content,
			publishedAt: currentTime
		}

		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postData)
			})

			if (response.ok) {
				console.log('Пост успешно опубликован')
				onClose()
			} else {
				console.error('Ошибка при публикации:', response.statusText)
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}

	const initialConfig = {
		namespace: 'NewPost',
		nodes: [...PlaygroundNodes],
		theme: PlaygroundEditorTheme,
		onError: (error: Error) => {
			console.error(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className={`bg-secondary transition-all duration-300-p-2 ${
					isFullScreen ? 'min-w-full min-h-full' : 'min-w-[75rem] min-h-[44rem]'
				}`}
			>
				{isFullScreen ? (
					<Minimize2
						onClick={handleToggleSize}
						className='cursor-pointer absolute top-4 right-10 hover:text-a-color'
						size={15}
					/>
				) : (
					<Maximize2
						onClick={handleToggleSize}
						className='cursor-pointer absolute top-4 right-10 hover:text-a-color'
						size={15}
					/>
				)}
				<div className='flex mx-auto'>
					<div className='p-2'>
						<PostWriteHeader
							authorName={authorName}
							authorUrl={authorUrl}
							authorAvatar={authorAvatar}
							communities={communities}
							selectedCommunityId={selectedCommunityId}
							setSelectedCommunityId={setSelectedCommunityId}
						/>
						<FormProvider {...form}>
							<form>
								<FormInput
									name='title'
									placeholder='Заголовок'
									className='bg-transparent'
									required
								/>
							</form>
						</FormProvider>
						<LexicalComposer initialConfig={initialConfig}>
							<SharedHistoryContext>
								<ToolbarContext>
									<div className='min-h-[88%] max-w-[74rem]'>
										<EditorWithContext
											onSave={handleSave}
											isFullScreen={isFullScreen}
										/>
									</div>
								</ToolbarContext>
							</SharedHistoryContext>
						</LexicalComposer>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
