"use client"


import styles from './index.module.scss'
import previewStyles from '/src/app/demo/components/preview/index.module.scss'

import Tree, {TreeElement} from "@/app/demo/components/Tree";
import {CSSProperties, useEffect, useRef, useState} from "react";
import _treeData from '../treeData'
import {HierarchyNode} from "d3";
import {FloatingArrow, flip, useFloating, arrow, detectOverflow, shift, autoPlacement} from "@floating-ui/react";
import Preview from "@/app/demo/components/preview";
import PreviewWithData from "@/app/demo/components/previewWithData";
import {getNumberFromCSSString} from "@/app/demo/components/webUtils";
import classnames from "classnames";
import useSWR from "swr";
import {ElementPreview} from "@/app/demo/types";
import TreeData from "../treeData";



const popOverWidth = getNumberFromCSSString(previewStyles.popOverWidth);

interface PopOverPosition {
    x:number,
    y:number,
    arrowX:number,
    arrowY:number,
    flipLeft:boolean
}

interface AnchorPosition {
    x:number,
    y:number,
    width:number,
    height:number
}
const fetcher = (url:string) => fetch(url).then((res) => {

    if(res.status === 404){
        throw "Element not found"
    }
    return res.json()
})

interface IndexProps {
    treeData:TreeElement
}

export default function Index({treeData}:IndexProps){
    const arrowRef = useRef(null);
    const popoverRef = useRef<HTMLDivElement | null>(null)
    const [hoveredElement,setHoveredElement] = useState<string | null>(null)
    const [selectedElement,setSelectedElement] = useState<string | null>(null)
    const [popOverPosition,setPopOverPosition] = useState<PopOverPosition | null>()
    const [anchorPosition,setAnchorPosition] = useState<AnchorPosition | null>()

  //  const {data,error} = useSWR<TreeElement>("/elements/tree", fetcher)



    useEffect(()=>{
        window.addEventListener("scroll",(e)=>{
            console.log(e)
           e.preventDefault()
        })
    },[])
    useEffect(()=>{

        if(!popoverRef.current && !anchorPosition) return
        const resizeObserver = new ResizeObserver((entries) => {

            if(!popOverPosition) {

                return
            }
            const newPopOverPosition = getPopOverPosition(anchorPosition!)
            if(!newPopOverPosition) return
            const {x,y,arrowY,arrowX,flipLeft} = newPopOverPosition
            setPopOverPosition({
                x,
                y,
                arrowY,
                arrowX,
                flipLeft
            })
        })
        resizeObserver.observe(popoverRef.current!)
        return ()=>{
            resizeObserver.disconnect()
        }

    },[popoverRef,anchorPosition])
  //  if(!data) return "Loading"
   /* const {refs, floatingStyles,update,context} = useFloating({


        middleware:[
            //shift({crossAxis:true}),
           //   flip({fallbackPlacements:["bottom","left","right","bottom-end","left-end"]}),
            shift(),
            arrow({element:arrowRef})

        ],

    });*/

    function onNodeClick(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){

        setSelectedElement(e.data.id)

       /* createPopper(el,ref.current, {
            placement: 'top',
        })*/
    }

    function getPopOverPosition(anchorPosition:{x:number,y:number}):PopOverPosition | undefined{

        const popoverHeight = popoverRef.current?.offsetHeight || 0
        const popoverWidth = popOverWidth || popoverRef.current?.offsetWidth || 0
        console.log(popoverWidth,popoverHeight)
       // if(popoverWidth === 0 || popoverHeight ===0 ) return
        let flipLeft:boolean = false;
        const x = anchorPosition.x + window.scrollX
        let y = anchorPosition.y + window.scrollY
        const arrowX =x;
        const arrowY = y
        const minY = popoverHeight/2  + window.scrollY - getAnchorMargin()
        const maxY = window.innerHeight + window.scrollY - popoverHeight/2 - getAnchorMargin()
        const maxX = window.innerWidth + window.scrollX - popoverWidth

        if(y>maxY) y = maxY
        if(y<=minY) y = minY

        if(x>maxX){
            flipLeft = true
        }

        return {
            x,
            y,
            arrowX,
            arrowY,
            flipLeft
        }
    }

    function onNodeMouseEnter(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement){
       // refs.setReference(el)




        const domRect = el.getBoundingClientRect()
        const newPopoverPosition = getPopOverPosition(domRect)
        if(!newPopoverPosition) return
        const {x,y,flipLeft,arrowY,arrowX} = newPopoverPosition
        setAnchorPosition({
            x:domRect.x,
            y:domRect.y,
            width:domRect.width,
            height:domRect.height
        })
        setPopOverPosition({
            x,
            y,
            arrowY,
            arrowX,
            flipLeft
        })




        setHoveredElement(e.data.id)
    }
    function onNodeMouseLeave(e:HierarchyNode<TreeElement>,el:HTMLAnchorElement,ev:any){

        const element = ev.toElement as HTMLElement
        console.log(styles.arrow,element)
        if(element?.classList?.contains(styles.arrow)){
            return
        }
        unsetHoveredElement()
    }

    function unsetHoveredElement(){
   
        setPopOverPosition(null)
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
            treeElement={treeData!}/>
       )
    }

    function getAnchorMargin():number {
        if(!anchorPosition) return 0
        return anchorPosition.height/2
    }

    function getArrowStyle():CSSProperties | undefined {
        if(!popOverPosition || !anchorPosition) return
        const yTransform = `calc(-50% + ${getAnchorMargin()}px)`
        const transform = popOverPosition.flipLeft?`translate(-100%, ${yTransform})`:`translate(${anchorPosition.width}px,${yTransform})`
        return {
            left:popOverPosition.arrowX,
            top:popOverPosition.arrowY,
            transform
        }
    }

    function getPopOverStyle():CSSProperties | undefined {
        const PADDING = 15;
        if(!popOverPosition || !anchorPosition) return
        let paddingLeft,paddingRight
        const deltaX = popOverPosition.flipLeft?-PADDING:PADDING
        const yTransform = `calc(-50% + ${getAnchorMargin()}px)`
        const transform = popOverPosition.flipLeft?`translate(-100%,${yTransform})`:`translate(${anchorPosition.width}px,${yTransform})`
        if(popOverPosition.flipLeft) paddingRight = PADDING
        else paddingLeft = PADDING
        console.log(popOverPosition.arrowY,popOverPosition.y)
        return {
            //backgroundColor:"red",
            left:popOverPosition.x + deltaX,
            top:popOverPosition.y,
            //transform:"translate(-100%,-50%)",
            transform//,
           // paddingRight,
           // paddingLeft
        }
    }

    function getArrowClassName():string {
        return popOverPosition?.flipLeft?styles["arrow-right"]:styles["arrow-left"]
    }

    function renderPopOver(){
        let render = null
        if(hoveredElement){
            render =(
                <div className={styles.popover}>
                    <PreviewWithData id={hoveredElement} />
                </div>
            )
        }
        return (
            <>
                {renderArrow()}
                <div ref={popoverRef} onMouseLeave={onMouseLeave} className={styles["popover-container"]}  style={getPopOverStyle()}>

                    {render}
                </div>
            </>

        )
    }

    function renderArrow(){
        if(!hoveredElement) return null
        return <div onMouseLeave={onMouseLeave} className={classnames(styles.arrow, getArrowClassName())} style={getArrowStyle()}/>
    }

    function onMouseLeave(e:React.MouseEvent){
        const target = e.relatedTarget as HTMLDivElement | undefined
        if(target?.classList?.contains("preview") || target?.classList?.contains(styles.arrow )) return
        unsetHoveredElement()
    }

    function renderInfo(){
        return (
            <div style={{top:0,left:0,zIndex:3000,backgroundColor:"white",padding:20,border:"1px solid black"}} className={"position-fixed"}>
                <p>Hovered element: {hoveredElement}</p>
                <p>Selected element: {selectedElement}</p>
                <p>Position: X: {popOverPosition?.x} Y: {popOverPosition?.y}</p>
            </div>
        )
    }

    //return <Popover/>
    return (
        <div className={styles.container}>

            {renderPopOver()}
            {renderTree()}
        </div>

    )
}