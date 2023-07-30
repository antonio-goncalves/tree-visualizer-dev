
import useSWR from 'swr'
import ElementDetails ,{ElementDetailsProps} from "@/app/demo/components/ElementDetails";
import {TreeElementType} from "@/app/demo/components/Tree";
import Loading from "@/app/demo/components/Loading";
const fetcher = (url:string) => fetch(url).then((res) => {

    if(res.status === 404){
        throw "Element not found"
    }
    return res.json()
})
export default function ElementDetailsWithData({id,treeElementTypes,onTreeNodeClick}: { id:string, treeElementTypes?:TreeElementType[],onTreeNodeClick?:(id:string)=>void }){

    const {data,error} = useSWR<ElementDetailsProps>(`/elements/details/${id}`, fetcher)


    if(error){
        return <div>Error</div>
    }



    if(data){
        const type = treeElementTypes?.find(el=>el.id === data.type)

       return (
           <ElementDetails
               {...data}
               treeElementTypes={treeElementTypes}
               onTreeNodeClick={onTreeNodeClick}
               subTitle={type?.title}
               subTitleColor={type?.color}
           />
       )
    }
    return <Loading />
}
