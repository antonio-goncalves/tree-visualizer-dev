import ImageGallery, {ReactImageGalleryItem} from "react-image-gallery";

import "./index.scss"
import Item from "@/app/demo/components/PhotoGallery/Item";
import Thumbnail from "@/app/demo/components/PhotoGallery/Thumbnail";
const images: ReactImageGalleryItem[] = [
    {
        original: "http://127.0.0.1:3000/1.jpg",
        thumbnail: "http://127.0.0.1:3000/1.jpg",
        description:"xxx"
    },
    {
        original: "http://127.0.0.1:3000/2.jpg",
        thumbnail: "http://127.0.0.1:3000/2.jpg"
    },
    {
        original: "http://127.0.0.1:3000/3.jpg",
        thumbnail: "http://127.0.0.1:3000/3.jpg"
    },
    {
        original: "http://127.0.0.1:3000/4.jpg",
        thumbnail: "http://127.0.0.1:3000/4.jpg"
    },
    {
        original: "http://127.0.0.1:3000/5.jpg",
        thumbnail: "http://127.0.0.1:3000/5.jpg"
    },
];

export default function PhotoGallery(){

    function renderItem(item:ReactImageGalleryItem){



            return (
                <Item
                    description={item.description}
                    fullscreen={item.fullscreen}
                    handleImageLoaded={null}
                    isFullscreen={false}
                    onImageError={()=>null}
                    original={item.original}
                    originalAlt={item.originalAlt}
                    originalHeight={item.originalHeight}
                    originalWidth={item.originalWidth}
                    originalTitle={item.originalTitle}
                    sizes={item.sizes}
                    loading={item.loading}
                    srcSet={item.srcSet}
                />
            );

    }

    function renderThumbInner(item:ReactImageGalleryItem){
        return (
            <Thumbnail
                thumbnail={item.thumbnail}
             />
        )
    }

    return  (
        <div style={{border:"1px solid blue"}}>
            <div>xxx</div>
            <ImageGallery additionalClass={"photo-gallery"} renderItem={renderItem} renderThumbInner={renderThumbInner} items={images} />
        </div>
    )
}