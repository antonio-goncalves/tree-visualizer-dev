import {useEffect, useState} from "react";
import {ElementPreview} from "@/app/demo/types";
import useSWR from 'swr'
import Preview from "@/app/demo/components/preview";
const fetcher = (url:string) => fetch(url).then((res) => {

    if(res.status === 404){
        throw "Element not found"
    }
    return res.json()
})
export default function PreviewWithData({id}: { id:string }){

    const {data,error} = useSWR<ElementPreview>(`/elements/preview/${id}`, fetcher)


    if(error){
        return <Preview failed={true}/>
    }

    if(data){
        return <Preview data={data}/>
    }
    return <Preview isLoading={true} />
}
