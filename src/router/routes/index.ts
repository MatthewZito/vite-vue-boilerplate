/* eslint-disable sort-keys */
import baseRoutes from './base.routes';

import type { RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		cache?: boolean;
		requiresAuth?: boolean;
	}
}

export default [
	// ...otherRoutes,
	{
		path: '/',
		name: 'Layout',
		component: async () => import('@/views/Layout.vue'),

		meta: {
			authRequired: true
		},
		children: baseRoutes
	},
	{
		path: '/:catchAll(.*)*',
		name: 'NotFound',
		component: async () => import('@/views/PageNotFound.vue'),
		meta: {
			authRequired: true
		}
	}
] as RouteRecordRaw[];
