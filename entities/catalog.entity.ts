/** Contrato mínimo compartido por todo contenido administrado en el catálogo. */
export interface CatalogEntity {
    id: string | number;
    title: string;
    synopsis: string;
    posterUrl: string;
    releaseYear: string;
    rating: number;
}
