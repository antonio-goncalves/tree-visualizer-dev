
export interface ElementImage {
    src:string,
    alt:string
}

export interface Reference {
    url:string,
    title:string
}

export interface ElementDetails {
    title:string,
    description:string,
    images:ElementImage[],
    references:Reference[]
}

export interface ElementPreview {
    title:string,
    description:string,
    image?:ElementImage,
    references:Reference[]
}