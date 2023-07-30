"use client"
import React, { FC, ReactElement } from 'react'
import {debounce} from 'lodash';
import {useEffect, useRef} from "react";
import D3Tree from "@/app/demo/components/D3Tree";
import {HierarchyNode} from "d3";
import styles from './index.module.css'
export interface TreeElement {
    id:string ,
    name:string,
    children?:TreeElement[],
    color?:string,
    type?:string
}

export interface TreeElementType {
    id:string,
    title?:string,
    color:string
}

export interface TreeProps {
    treeElement:TreeElement,
    treeElementTypes?:TreeElementType[],
    onNodeClick?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseOver?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseEnter?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseLeave?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeFocusIn?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeFocusOut?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    resizeDebounceMS?:number,
    padding?:number,
    leftPadding?:number,
    rightPadding?:number,
    nodeVerticalDistance?:number

}

const DEFAULT_DEBOUNCE_MS = 200;




export default function Tree({
     treeElement,
     onNodeClick,
     resizeDebounceMS=DEFAULT_DEBOUNCE_MS,
     padding,
     rightPadding,
     leftPadding,
     onNodeMouseOver,
     onNodeMouseEnter,
     onNodeMouseLeave,
     onNodeFocusOut,
     onNodeFocusIn,
    treeElementTypes,
                                 nodeVerticalDistance
}:TreeProps){
    const ref = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)

    const removeRef = useRef<()=>void| undefined>()
    const scrollYRef = useRef<number>(0)





    function getD3Tree():void{
        console.log("getD3Tree")
        const scrollY = window.scrollY
        removeRef.current?.()
        removeRef.current = D3Tree({
            data:treeElement,
            svgEl:svgRef.current!,
            types:treeElementTypes,
            onNodeClick,
            onNodeMouseOver,
            onNodeMouseEnter,
            onNodeMouseLeave,
            onNodeFocusIn,
            onNodeFocusOut,
            width:ref.current!.offsetWidth,
            rightPadding,
            leftPadding,
            padding,
            nodeVerticalDistance
        })




    }





    function onResize(){
        console.log("resize")
        getD3Tree()
    }

    useEffect(()=>{



        if(!svgRef.current || !ref.current) return
        console.log("useEffect")
        getD3Tree();
        const _onResize = debounce(onResize,resizeDebounceMS,{trailing:true})

        addEventListener("resize", _onResize);
       // const resizeObserver = new ResizeObserver(_onResize as ()=>void)
        //resizeObserver.observe(ref.current!)
        return ()=>{
            removeRef.current?.()
          //  resizeObserver.disconnect()
            removeEventListener("resize",_onResize)
        }
    },[svgRef,ref,leftPadding,rightPadding,padding,treeElement])




    return (
        <div ref={ref} className={styles.container}>
            <svg ref={svgRef} />
        </div>
    )
}

