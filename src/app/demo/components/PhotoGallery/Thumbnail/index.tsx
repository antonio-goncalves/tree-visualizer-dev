import Image from 'next/image'

interface ThumbnailProps {
    src:string,
    alt:string,
    label?:string | undefined
}

export default function Thumbnail({label,src,alt}:ThumbnailProps){

    return (
        <span className="image-gallery-thumbnail-inner">
        <Image
            className="image-gallery-thumbnail-image"
            src={src}
            fill={true}
            alt={alt}
            sizes={"100px"}

        />

                <div className="image-gallery-thumbnail-label">
                    {label}
                </div>

      </span>
    )
   /* return (
        <span className="image-gallery-thumbnail-inner">
        <img
            className="image-gallery-thumbnail-image"
            src={src}
            alt={"xxx"}
        />

                <div className="image-gallery-thumbnail-label">
                    Label
                </div>

      </span>
    )*/
}