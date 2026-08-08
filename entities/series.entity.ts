import type { CatalogEntity } from './catalog.entity.js';

export interface Series extends CatalogEntity {
    seasonCount: number;
    episodeCount: number;
    status: 'running' | 'ended' | 'unknown';
    genreIds: number[];
}
