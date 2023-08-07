import React from "react";
import { bool, func, string } from "prop-types";
import Image from 'next/image'
const defaultProps = {
    description: "",
    fullscreen: "",
    isFullscreen: false,
    originalAlt: "",
    originalHeight: "",
    originalWidth: "",
    originalTitle: "",
    sizes: "",
    srcSet: "",
    loading: "eager",
};

interface ItemProps {
    description: string,
    fullscreen: string, // fullscreen version of img
    handleImageLoaded: ()=>void,
    isFullscreen: boolean,
    onImageError: ()=>void,
    original: ()=>void,
    originalAlt: string,
    originalHeight: string,
    originalWidth: string,
    originalTitle: string,
    sizes: string,
    srcSet: string,
    loading: string,
}

const Item = React.memo((props:any) => {


    const original = props.original as string
    return (
        <React.Fragment>

            <Image
                className="image-gallery-image xxx"
                src={original}
                alt={"xxxx"}
                fill={true}

            />

                <span className="image-gallery-description">Description</span>

        </React.Fragment>
    );
   /* return (
        <React.Fragment>

            <img
                className="image-gallery-image"
                src={itemSrc}
                alt={originalAlt}
                srcSet={srcSet}
                height={originalHeight}
                width={originalWidth}
                sizes={sizes}
                title={originalTitle}
                onLoad={(event) => handleImageLoaded(event, original)}
                onError={onImageError}
                loading={loading}
            />
            {description && (
                <span className="image-gallery-description">{description}</span>
            )}
        </React.Fragment>
    );*/
});

Item.displayName = "Item";



export default Item;