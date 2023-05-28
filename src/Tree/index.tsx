"use client"

import {useEffect, useRef} from "react";
import D3Tree from "@/D3Tree";
import {HierarchyNode} from "d3";

export interface TreeElement {
    id?:string | number,
    name:string,
    children?:TreeElement[]
}


interface TreeProps {
    treeElement:TreeElement,
    onNodeClick?:(node: HierarchyNode<TreeElement>)=>void

}

export default function Tree({treeElement,onNodeClick}:TreeProps){
    const ref = useRef<SVGSVGElement | null>(null)

    useEffect(()=>{
        let remove
        if(ref.current){
            remove = D3Tree(treeElement,ref.current!,{onNodeClick})
            setTimeout(()=>{

            },4000)
            setTimeout(()=>{

            },6000)
        }

        return ()=>{
          //  remove?.()
        }
    },[ref])

    return (
        <div style={{backgroundColor:"#FFCCCC"}}>
            <h1>tree</h1>
            <svg ref={ref}/>
        </div>
    )
}