"use client"
import React, { FC, ReactElement } from 'react'
import {debounce} from 'lodash';
import {useEffect, useRef} from "react";
import D3Tree, {D3TreeBaseOptions} from "@/app/demo/components/D3Tree";
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

export enum ResizeEventStrategy {
    ResizeObserver="resizeObserver",
    EventListener="eventListener"
}

export interface TreeProps extends D3TreeBaseOptions{

    resizeDebounceMS?:number,
    resizeEventStrategy?:ResizeEventStrategy

}

const DEFAULT_DEBOUNCE_MS = 200;




export default function Tree({
     data,
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
    types,
      nodeVerticalDistance,
    autoPadding,
    resizeEventStrategy,
    nodeOptions,
    selectedElement
}:TreeProps){
    const ref = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)

    const removeRef = useRef<()=>void| undefined>()
    const scrollYRef = useRef<number>(0)





    function getD3Tree():void{
        const scrollY = window.scrollY
        removeRef.current?.()
        removeRef.current = D3Tree({
            data,
            svgEl:svgRef.current!,
            types,
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
            nodeVerticalDistance,
            autoPadding,
            nodeOptions,
            selectedElement
        })




    }





    function onResize(){
        getD3Tree()
    }

    useEffect(()=>{



        if(!svgRef.current || !ref.current) return

        getD3Tree();
        const _onResize = debounce(onResize,resizeDebounceMS,{trailing:true})
        let resizeObserver:ResizeObserver | undefined
        if(resizeEventStrategy === ResizeEventStrategy.EventListener){
            addEventListener("resize", _onResize as ()=>void);
        }else {
            resizeObserver = new ResizeObserver(_onResize as ()=>void)
            resizeObserver.observe(ref.current!)
        }
        //


        return ()=>{

            removeRef.current?.()
            resizeObserver?.disconnect()
            removeEventListener("resize",_onResize as ()=>void)
        }
    },[svgRef,ref,leftPadding,rightPadding,padding,nodeOptions])




    return (
        <div ref={ref}  className={styles.container}>
            <svg ref={svgRef} />
        </div>
    )
}

