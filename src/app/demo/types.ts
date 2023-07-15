
export interface ElementImage {
    src:string,
    alt:string,
    reference:Reference,
    aspectRatio?:number | string,
    main?:boolean,
    preview?:boolean
}

export interface ElementDetails {
    _id:string,
    parent?:string,
    title:string,
    lineage?:string,
    website:string,
    description:string,
    images:ElementImage[],
    references:Reference[]
}

export interface Lineage {
    _id : string,
    color : string,
    title : string
}

export interface Reference {
    url:string,
    title:string
}


export interface ElementPreview {
    title:string,
    subTitle?:string,
    subTitleColor?:string,
    description:string,
    image?:ElementImage,
    references:Reference[]
}