import { TreeElement, TreeElementType } from "@/app/demo/components/Tree";


export interface ImageInfo {
    src: string,
    alt: string,
    reference: Reference,
    description?: string,
    label?: string
}

export interface ElementImage extends ImageInfo {
    aspectRatio?: number | string,
    main?: boolean,
    photoGallery?: boolean,
    preview?: boolean
}

export interface ElementEntry {
    _id: string,
    parent?: string,
    title: string,
    lineage?: string,
    website: string,
    description: string,
    images: ElementImage[],
    references: Reference[]
}

export interface Lineage {
    _id: string,
    color: string,
    title: string
}

export interface Reference {
    url: string,
    title: string
}


export interface ElementPreview {
    title: string,
    subTitle?: string,
    subTitleColor?: string,
    description: string,
    image?: ElementImage,
    references: Reference[]
}

export interface ElementDetails {
    title: string,
    subTitle?: string | undefined,
    subTitleColor?: string | undefined,
    id: string,
    description: string,
    type?: string,
    treeElement: TreeElement,
    references: Reference[]
}