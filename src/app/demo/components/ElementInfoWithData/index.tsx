
import useSWR from 'swr'
import ElementInfo, { ElementInfoProps } from "@/app/demo/components/ElementInfo";
import { TreeElementType } from "@/app/demo/components/Tree";
import Loading from "@/app/demo/components/Loading";
import { ElementDetails } from "@/app/demo/types";
const fetcher = (url: string) => fetch(url).then((res) => {
    if (res.status === 404) {
        throw "Element not found"
    }
    return res.json()
})



export default function ElementInfoWithData({ id, treeElementTypes, onTreeNodeClick }: { id: string, treeElementTypes?: TreeElementType[], onTreeNodeClick?: (id: string) => void | undefined }) {

    const { data, error } = useSWR<ElementDetails>(`/elements/details/${id}`, fetcher)


    if (error) {
        return <div>Error</div>
    }
    if (!data) return <Loading />




    const type = treeElementTypes?.find(el => el.id === data.type)

    return (
        <ElementInfo
            {...data}
            treeElementTypes={treeElementTypes}
            onTreeNodeClick={onTreeNodeClick}
            subTitle={type?.title}
            subTitleColor={type?.color}
        />
    )


}
