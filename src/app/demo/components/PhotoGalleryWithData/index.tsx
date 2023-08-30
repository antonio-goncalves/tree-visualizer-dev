import useSWR from 'swr'
import {ElementDetails, ImageInfo} from "@/app/demo/types";
import Loading from "@/app/demo/components/Loading";
import PhotoGallery from "@/app/demo/components/PhotoGallery";

const fetcher = (url:string) => fetch(url).then((res) => {

    if(res.status === 404){
        throw "Element not found"
    }
    return res.json()
})

export default function PhotoGalleryWithData({id,className}:{id:string,className?:string}){
    const {data,error} = useSWR<ImageInfo[]>(`/elements/images/${id}`, fetcher)

    if(error){
        return <div>Error</div>
    }
    if(!data) return <Loading />
    return <PhotoGallery items={ data} className={className}/>
}