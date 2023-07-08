export interface ElementImage {
    src:string,
    alt:string,
    reference:Reference,
    main?:boolean
}

export interface Reference {
    url:string,
    title:string
}
export interface ElementDetails {
    _id:string,
    parent?:string,
    title:string,
    website:string,
    description:string,
    images:ElementImage[],
    references:Reference[]
}

