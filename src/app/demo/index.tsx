"use client"


import styles from './index.module.scss'
import Tree, {TreeElement} from "@/Tree";
import {useEffect, useRef, useState} from "react";
import treeData from '../treeData'
import {HierarchyNode} from "d3";
import {FloatingArrow, flip, useFloating,arrow,detectOverflow} from "@floating-ui/react";
import Preview from "@/app/demo/components/preview";
import PreviewWithData from "@/app/demo/components/previewWithData";

const middleware = {
    name: 'middleware',
    async fn(state) {
        const overflow = await detectOverflow(state);
        console.log(overflow)
        return {};
    },
};
export default function Index(){
    const arrowRef = useRef(null);
    const [hoveredElement,setHoveredElement] = useState<string | null>(null)
    const [selectedElement,setSelectedElement] = useState<string | null>(null)
    const {refs, floatingStyles,update,context} = useFloating({


        middleware:[
           flip({fallbackPlacements:["bottom","left","right","bottom-end","left-end"]}),
            arrow({element:arrowRef})

        ],

    });
    console.log("selectedElement",selectedElement)
    useEffect(()=>{
        setTimeout(()=>{
            update()
            console.log("update")
        },5000)
    },[])

    function onNodeClick(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){
        console.log("clicking",el)
        setSelectedElement(e.data.id)

       /* createPopper(el,ref.current, {
            placement: 'top',
        })*/
    }

    function onNodeMouseEnter(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){
        refs.setReference(el)
        setHoveredElement(e.data.id)
    }
    function onNodeMouseLeave(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){
        setHoveredElement(null)
    }

    function renderTree(){
       return (
           <Tree

            leftPadding={65}
            rightPadding={183}
              // leftPadding={120}
              // rightPadding={250}
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
        if(hoveredElement){
            render =(
                <div className={styles.popover}>
                    <FloatingArrow className={styles.arrow} width={20} height={10} ref={arrowRef} context={context} />
                    <PreviewWithData id={hoveredElement} />
                </div>
            )
        }
        return (
            <div style={{...floatingStyles}} ref={refs.setFloating}>
                {render}
            </div>
        )
    }

    function renderInfo(){
        return (
            <div style={{top:0,left:0}} className={"position-fixed"}>
                <p>Hovered element: {hoveredElement}</p>
                <p>Selected element: {selectedElement}</p>
            </div>
        )
    }

    //return <Popover/>
    return (
        <div className={styles.container}>

            {renderInfo()}
            {renderPopOver()}
            {renderTree()}
        </div>

    )
}