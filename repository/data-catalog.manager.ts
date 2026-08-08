/** Identidad mínima aceptada por cualquier repositorio del catálogo. */
export type CatalogIdentity<T extends { id: string | number }> = Pick<T, 'id'>;

/** Datos permitidos al crear una entidad cuyo identificador se recibe por separado. */
export type CatalogCreate<T extends { id: string | number }> = Omit<T, 'id'>;

/** Una actualización puede cambiar cualquier campo excepto la identidad. */
export type CatalogUpdate<T extends { id: string | number }> = Partial<Omit<T, 'id'>>;

/**
 * Repositorio genérico en memoria. Conserva el tipo concreto T en todas las
 * búsquedas y evita duplicar operaciones para películas, series y documentales.
 */
export class DataCatalogManager<T extends { id: string | number }> {
    private readonly items = new Map<T['id'], T>();

    public constructor(initialItems: readonly T[] = []) {
        this.addMany(initialItems);
    }

    public get size(): number { return this.items.size; }

    public add(item: T): T {
        this.items.set(item.id, item);
        return item;
    }

    public create(id: T['id'], data: CatalogCreate<T>): T {
        return this.add({ id, ...data } as T);
    }

    public addMany(items: readonly T[]): void {
        items.forEach((item) => this.add(item));
    }

    public replaceAll(items: readonly T[]): void {
        this.clear();
        this.addMany(items);
    }

    public getAll(): T[] { return [...this.items.values()]; }

    public findById(id: T['id']): T | undefined { return this.items.get(id); }

    public findByIdentity(identity: CatalogIdentity<T>): T | undefined {
        return this.findById(identity.id);
    }

    public findBy<K extends keyof T>(field: K, value: T[K]): T[] {
        return this.filter((item) => Object.is(item[field], value));
    }

    public filter(predicate: (item: Readonly<T>) => boolean): T[] {
        return this.getAll().filter(predicate);
    }

    public update(id: T['id'], changes: CatalogUpdate<T>): T | undefined {
        const current = this.findById(id);
        if (!current) return undefined;
        const updated = { ...current, ...changes, id: current.id };
        this.items.set(id, updated);
        return updated;
    }

    public remove(id: T['id']): boolean { return this.items.delete(id); }

    public has(id: T['id']): boolean { return this.items.has(id); }

    public clear(): void { this.items.clear(); }
}
