import Image from 'next/image'
export default function Thumbnail(props:any){
    const src = props.thumbnail as string
    return (
        <span className="image-gallery-thumbnail-inner">
        <Image
            className="image-gallery-thumbnail-image"
            src={src}
            fill={true}
            alt={"xxx"}
            sizes={"100px"}

        />

                <div className="image-gallery-thumbnail-label">
                    Label
                </div>

      </span>
    )
    return (
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
    )
}