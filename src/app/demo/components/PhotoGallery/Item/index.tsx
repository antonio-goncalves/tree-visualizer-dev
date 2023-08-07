import React from "react";
import { bool, func, string } from "prop-types";
import Image from 'next/image'
import {Reference} from "@/app/demo/types";
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

interface _ItemProps {
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
/*
* label,thumbnail,originalAlt,reference,original,description
* */
interface ItemProps {
    src:string,
    alt:string,
    reference:Reference,
    description?: string |undefined,
    label?:string | undefined,
}

const Item = React.memo(({description,label,reference,src,alt}:ItemProps) => {


    return (
        <React.Fragment>

            <Image
                className="image-gallery-image xxx"
                src={src}
                alt={alt}
                sizes= {`
                        (max-width: 575px) 575px,
                        (max-width: 767px) 767px,
                        (max-width: 991px) 991px,
                        (max-width: 1199px) 1199px, 
                        (max-width: 1399px)  1399px,  
                        (max-width: 1919px)  1919px`
            }
                fill={true}

            />

                <span className="image-gallery-description">{description}</span>

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