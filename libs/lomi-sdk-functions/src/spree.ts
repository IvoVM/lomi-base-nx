export type SpreeListParams = {
    page?: number;
    per_page?: number;
    sort?: string;
    filter?: string;
    include?: string;
}

export type SpreeEntity<T> = {
    attributes: T;
    id: string;
    type: string;
    relationships: any;
}

export type SpreeListResponse<T> = {
    data: SpreeEntity<T>[];
    included: SpreeEntity<any>[];
    meta: {
        count: number
        total_count: number,
    }
}

export type SpreeEntityResponse<T> = {
    data: SpreeEntity<T>;
    included: SpreeEntity<any>[];
}

export const setIncluded = (data: SpreeListResponse<any>, entityType:string):SpreeListResponse<any> => {
    data.data.forEach((entity:SpreeEntity<any>) => {
        entity.attributes[entityType+"s"] = data.included.filter((includedEntity:SpreeEntity<any>) => {
            return includedEntity.type == entityType && entity.relationships[entityType+"s"].data.find((r:any)=>r.id == includedEntity.id)
        })
    })
    return data
}