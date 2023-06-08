"use client"
import React, { FC, ReactElement } from 'react'
import {debounce} from 'lodash';
import {useEffect, useRef} from "react";
import D3Tree from "@/D3Tree";
import {HierarchyNode} from "d3";
import styles from './index.module.css'
export interface TreeElement {
    id?:string | number,
    name:string,
    children?:TreeElement[],
    color?:string
}


export interface TreeProps {
    treeElement:TreeElement,
    onNodeClick?:(node: HierarchyNode<TreeElement>)=>void,
    resizeDebounceMS

}

const DEFAULT_DEBOUNCE_MS = 200;




const Tree:FC<TreeProps> = ({treeElement,onNodeClick,resizeDebounceMS}): ReactElement =>{
    const ref = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(()=>{
        if(!svgRef.current || !ref.current) return
        let remove:(()=>void) | null = null;
        function getD3Tree():()=>void{
            remove?.()
            return D3Tree(treeElement,svgRef.current!,{onNodeClick,width:ref.current!.offsetWidth})
        }

        const _getD3Tree = debounce(getD3Tree,resizeDebounceMS)
        const resizeObserver = new ResizeObserver(_getD3Tree as ()=>void)

        resizeObserver.observe(ref.current!)

        remove = getD3Tree()


        return ()=>{
            remove?.()
            resizeObserver.unobserve(ref.current!)
        }
    },[svgRef,ref])

    return (
        <div ref={ref} className={styles.container}>
            <svg ref={svgRef} />
        </div>
    )
}
Tree.defaultProps = {
    resizeDebounceMS:DEFAULT_DEBOUNCE_MS
}

export default Tree