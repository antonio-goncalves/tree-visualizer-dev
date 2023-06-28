import {useEffect, useState} from "react";
import {ElementPreview} from "@/app/demo/types";
import useSWR from 'swr'
import Preview from "@/app/demo/components/preview";
const fetcher = (url:string) => fetch(url).then((res) => res.json())
export default function PreviewWithData({id}: { id:string }){
    console.log(`/elements/preview/${id}`)
    const {data,error} = useSWR<ElementPreview>(`/elements/preview/${id}`, fetcher)
    console.log(data,error)
    if(data){
        return <Preview data={data}/>
    }
    return <Preview isLoading={true} />
}
