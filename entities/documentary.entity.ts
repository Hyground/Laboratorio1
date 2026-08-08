import type { CatalogEntity } from './catalog.entity.js';

export interface Documentary extends CatalogEntity {
    subject: string;
    durationMinutes: number;
    educational: boolean;
}
