import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import "./index.scss"
import Item from "@/app/demo/components/PhotoGallery/Item";
import Thumbnail from "@/app/demo/components/PhotoGallery/Thumbnail";
import { ImageInfo, Reference } from "@/app/demo/types";
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import WebUtils from "@/app/demo/components/webUtils";

interface PhotoGalleryProps {
    items: ImageInfo[],
    className?: string
}


interface ReactImageGalleryItemExtra extends ReactImageGalleryItem {
    reference: Reference,
    label?: string

}
export default function PhotoGallery({ items, className }: PhotoGalleryProps) {

    const [_items, setItems] = useState<ReactImageGalleryItemExtra[]>(getImageGalleryItems())

    useEffect(() => {
        setItems(getImageGalleryItems())
    }, [items])

    function renderItem(item: ReactImageGalleryItemExtra) {
        const { label, thumbnail, originalAlt, reference, original, description } = item
        return (
            <Item
                src={original}
                alt={originalAlt || ""}
                reference={reference}
                label={label}
                description={description}
            />
        )


    }

    function renderThumbInner(item: ReactImageGalleryItemExtra) {

        const { original, originalAlt, label } = item
        return (
            <Thumbnail
                src={original}
                alt={originalAlt || ""}
                label={label}
            />
        )
    }

    function getImageGalleryItems(): ReactImageGalleryItemExtra[] {
        if (!items) return []
        return items.map(el => ({
            original: el.src,
            thumbnail: el.src,
            originalAlt: el.alt,
            reference: el.reference,
            description: el.description,
            label: el.label


        }))
    }

    if (_items.length === 0) return null
    return (

        <ImageGallery
            items={_items}
            showFullscreenButton={!WebUtils.isTouchDevice()}
            additionalClass={classnames("photo-gallery", className)}
            renderItem={renderItem as (item: ReactImageGalleryItem) => React.ReactNode}
            renderThumbInner={renderThumbInner as (item: ReactImageGalleryItem) => React.ReactNode} />

    )
}