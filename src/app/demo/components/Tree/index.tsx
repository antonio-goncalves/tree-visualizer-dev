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
    color?:string
}


export interface TreeProps {
    treeElement:TreeElement,
    onNodeClick?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseOver?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseEnter?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseLeave?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeFocusIn?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeFocusOut?:(node: HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:MouseEvent)=>void,
    resizeDebounceMS?:number,
    padding?:number,
    leftPadding?:number,
    rightPadding?:number

}

const DEFAULT_DEBOUNCE_MS = 200;




export default function Tree({treeElement,onNodeClick,resizeDebounceMS=DEFAULT_DEBOUNCE_MS,padding,rightPadding,leftPadding,onNodeMouseOver,onNodeMouseEnter,onNodeMouseLeave,onNodeFocusOut,onNodeFocusIn}:TreeProps){
    const ref = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(()=>{
        console.log("use effect")
        if(!svgRef.current || !ref.current) return
        let remove:(()=>void) | null = null;
        function getD3Tree():void{
            remove?.()
            remove = D3Tree(treeElement,svgRef.current!,{
                onNodeClick,
                onNodeMouseOver,
                onNodeMouseEnter,
                onNodeMouseLeave,
                onNodeFocusIn,
                onNodeFocusOut,
                width:ref.current!.offsetWidth,
                rightPadding,
                leftPadding,
                padding
            })
        }
        getD3Tree();
        const _getD3Tree = debounce(getD3Tree,resizeDebounceMS)
        const resizeObserver = new ResizeObserver(_getD3Tree as ()=>void)

        resizeObserver.observe(ref.current!)




        return ()=>{
            remove?.()
            resizeObserver.disconnect()
        }
    },[svgRef,ref,leftPadding,rightPadding,padding,treeElement])

    return (
        <div ref={ref} className={styles.container}>
            <svg ref={svgRef} />
        </div>
    )
}

