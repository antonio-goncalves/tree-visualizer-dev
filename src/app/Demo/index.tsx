"use client"


import styles from './index.module.css'
import Tree, {TreeElement} from "@/Tree";
import {useEffect, useRef, useState} from "react";
import treeData from '../treeData'
import {HierarchyNode} from "d3";
import {autoPlacement, flip, useFloating} from "@floating-ui/react";

export default function Index(){

    const [h,setH] = useState<string | null>(null)
    const {refs, floatingStyles} = useFloating({
        placement:"top",
        middleware:[flip({fallbackPlacements:["bottom"]})],

    });

    function onNodeClick(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){
        console.log(e,el)
       /* createPopper(el,ref.current, {
            placement: 'top',
        })*/
    }

    function onNodeMouseEnter(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){
        refs.setReference(el)
        setH(e.data.name)
    }
    function onNodeMouseLeave(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){
        setH(null)
    }

    function renderTree(){
       return (
           <Tree

            leftPadding={65}
            rightPadding={183}
            onNodeClick={onNodeClick}
            onNodeMouseOver={(e,element)=>{

            }}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            onNodeFocusIn={onNodeMouseEnter}
            onNodeFocusOut={onNodeMouseLeave}
            treeElement={treeData}/>
       )
    }

    function renderPopOver(){
        let render = null
        if(h){
            render = <h1>{h}</h1>
        }
        return (
            <div style={{...floatingStyles}} ref={refs.setFloating}  className={styles.popover}>
                {render}
            </div>
        )
    }

    return (
        <div>
            {renderPopOver()}
            {renderTree()}
        </div>

    )
}