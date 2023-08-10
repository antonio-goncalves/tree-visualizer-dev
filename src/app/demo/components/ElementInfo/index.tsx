import Tree, {ResizeEventStrategy, TreeElement, TreeElementType} from "@/app/demo/components/Tree";
import classnames from "classnames";
import {ElementDetails} from "@/app/demo/types";
import References from "@/app/demo/components/References";
import {HierarchyNode} from "d3";
import PhotoGalleryWithData from "@/app/demo/components/PhotoGalleryWithData";
import {CIRCLE_RADIUS_BIG, NodeOptions} from "@/app/demo/components/D3Tree";
import {useEffect, useRef, useState} from "react";
import {debounce} from 'lodash';
export interface ElementInfoProps extends ElementDetails{

    treeElementTypes?:TreeElementType[],
    onTreeNodeClick?:(id:string)=>void
}

interface TreeState {
    data:TreeElement,
    nodeOptions:NodeOptions[] | undefined,
    leftPadding?:number | undefined

}
const BREAKPOINT = 768
export default function ElementInfo({treeElement,type,title,id,description,treeElementTypes,subTitleColor,subTitle,references,onTreeNodeClick}:ElementInfoProps){

    const [treeState, setTreeState] = useState<TreeState | null>(null)
    const windowWidthRef = useRef<number>(window.innerWidth)

    const [showFirstTreeNode,setShowFirstTreeNode] = useState<boolean>(windowWidthRef.current>=BREAKPOINT)

    useEffect(()=>{
        const nodeOptions = getTreeOptions()
        console.log(showFirstTreeNode)
        setTreeState({
            data:treeElement,
            nodeOptions,
            leftPadding:(!!nodeOptions && !showFirstTreeNode)?CIRCLE_RADIUS_BIG:undefined
        })
    },[treeElement,showFirstTreeNode])

    useEffect(()=>{
        function onResize(){

            if(window.innerWidth>= BREAKPOINT && !showFirstTreeNode) setShowFirstTreeNode(true)
            if(window.innerWidth< BREAKPOINT && showFirstTreeNode) setShowFirstTreeNode(false)
        }
        const _onResize = debounce(onResize,250)
        addEventListener("resize", _onResize as ()=>void);
        return ()=>{
            window.removeEventListener("resize",_onResize as ()=>void)
        }

    },[showFirstTreeNode])

    function getTreeOptions():NodeOptions[] | undefined{
        //@ts-ignore
        if(treeElement?.children?.[0].children?.length>0){
            return [
                {
                  depth:1,
                  hide:true
                },
                {
                    depth: 1,
                    y: (n) => {
                        return -12
                    }
                }
            ]
        }
    }
    function renderParagraphs(){
        const paragraphs = description.split("\n")
        return paragraphs.map((p,i)=>(
            <p key={i} className={classnames({"mb-0":i===paragraphs.length-1})}>{p}</p>
        ))
    }
    function renderSubTitle() {

        if(!subTitle) return null
        return <p className={"mb-2"} style={{color:subTitleColor}}><b>{subTitle}</b></p>
    }

    function _onTreeNodeClick(node: HierarchyNode<TreeElement>){
        onTreeNodeClick?.(node.data.id)
    }

    function renderTree(){
        if(!treeState) return null
        return (

            <Tree
                autoPadding={true}
                selectedElement={id}
                resizeEventStrategy={ResizeEventStrategy.EventListener}
                types={treeElementTypes || []}
                onNodeClick={_onTreeNodeClick}

                {...treeState}

            />

        )
    }
    console.log("render ElementInfo",treeState)
    return (
        <div >
            <h1>{title}</h1>
            {renderSubTitle()}
            <References autoFocus={true} references={references} className={"mb-2"} />
            {renderParagraphs()}
            <PhotoGalleryWithData className={"mt-4 mb-4"} id={id} />
            {renderTree()}
        </div>
    )
}