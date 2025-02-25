import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { authenticated } from '@/modules/access/authenticated'

export const Roles: CollectionConfig = {
	slug: 'roles',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated,
	},
	admin: {
		useAsTitle: 'roleName',
	},
	fields: [
		{
			label: 'Название',
			name: 'roleName',
			type: 'text',
			required: true,
		},
		{
			label: 'Бадж',
			name: 'roleBadge',
			type: 'upload',
			relationTo: 'media',
		},
		{
			label: 'Цвет роли',
			name: 'roleColor',
			defaultValue: '#eeedf5',
			type: 'text',
		},
		{
			name: 'roleType', // required
			type: 'select', // required
			hasMany: false,
			admin: {
				isClearable: true,
				isSortable: true,
			},
			required: true,
			options: [
				{
					label: 'Владелец',
					value: 'owner',
				},
				{
					label: 'Администратор',
					value: 'admin',
				},
				{
					label: 'Модератор',
					value: 'moderator',
				},
				{
					label: 'everyone',
					value: 'everyone',
				},
			],
		},
		{
			label: 'Пользователи с этой ролью',
			name: 'relatedUsers',
			type: 'join',
			collection: 'users',
			on: 'userRoles',
			maxDepth: 1
		},
		{
			label: 'Блокировать пользователей в сообществе',
			name: 'COMMUNITY_USER_BUN',
			type: 'radio',
			options: [
				{
					label: 'Да',
					value: 'true',
				},
				{
					label: 'Нет',
					value: 'false',
				},
			],
			defaultValue: 'false',
			admin: {
				layout: 'horizontal',
			},
		},
		{
			label: 'Удалять посты в сообществе',
			name: 'COMMUNITY_POST_DELETE',
			type: 'radio',
			options: [
				{
					label: 'Да',
					value: 'true',
				},
				{
					label: 'Нет',
					value: 'false',
				},
			],
			defaultValue: 'false',
			admin: {
				layout: 'horizontal',
			},
		},
	],
	// hooks: {
	// 	afterRead: [communityModerators],
	// },
}
