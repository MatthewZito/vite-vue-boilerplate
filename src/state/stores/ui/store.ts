/* eslint-disable sort-keys */
import { defineStore } from 'pinia';

import type { NamedRoute, CacheState, UiState } from './types';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

export function cacheState(): CacheState {
	return {
		cachedViews: []
	};
}

/**
 * The ui store controls app-wide UI state
 */
export const useUiStore = defineStore('ui', {
	state: (): UiState => ({
		...cacheState()
	}),

	getters: {
		/**
		 * Get all cached views
		 */
		getCachedViews: (state) => state.cachedViews
	},

	actions: {
		/**
		 * Add Vue Router route object to cache list, to be used by keep-alive
		 */
		addViewToCache(view: RouteLocationNormalizedLoaded) {
			if (!view.name) return;

			if (this.cachedViews.includes(view.name)) {
				return;
			}

			if (view.meta.cache) {
				this.cachedViews.push(view.name);
			}
		},

		/**
		 * Remove Vue Router route object from cache list
		 */
		removeViewFromCache(view: NamedRoute) {
			const idx = this.cachedViews.indexOf(view.name);

			idx > -1 && this.cachedViews.splice(idx, 1);
		},

		/**
		 * Invalidate entire view cache
		 */
		resetViewCache() {
			this.$patch(cacheState());
		}
	}
});
