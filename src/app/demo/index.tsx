"use client"


import styles from './index.module.scss'
import previewStyles from '/src/app/demo/components/preview/index.module.scss'
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import Tree, { ResizeEventStrategy, TreeElement, TreeElementType } from "@/app/demo/components/Tree";
import { HierarchyNode } from "d3";
import PreviewWithData from "@/app/demo/components/previewWithData";
import WebUtils, { getNumberFromCSSString } from "@/app/demo/components/webUtils";
import classnames from "classnames";
import ElementInfoModal from "@/app/demo/components/ElementInfoModal";
import References from "@/app/demo/components/References";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const popOverWidth = getNumberFromCSSString(previewStyles.popOverWidth);

interface PopOverPosition {
    x: number,
    y: number,
    arrowX: number,
    arrowY: number,
    flipLeft: boolean
}

interface AnchorPosition {
    x: number,
    y: number,
    width: number,
    height: number
}
const fetcher = (url: string) => fetch(url).then((res) => {

    if (res.status === 404) {
        throw "Element not found"
    }
    return res.json()
})

interface IndexProps {
    treeData: TreeElement
    treeElementTypes: TreeElementType[]
}

export default function Index({ treeData, treeElementTypes }: IndexProps) {

    const popoverRef = useRef<HTMLDivElement | null>(null)
    const [hoveredElement, setHoveredElement] = useState<string | null>(null)
    const [selectedElement, _setSelectedElement] = useState<string | null>(null)
    const [popOverPosition, setPopOverPosition] = useState<PopOverPosition | null>()
    const [anchorPosition, setAnchorPosition] = useState<AnchorPosition | null>()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!
    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            //@ts-ignore
            const params = new URLSearchParams(searchParams)
            if (value) params.set(name, value); else params.delete(name);
            return params.toString()
        },
        [searchParams]
    )



    useEffect(() => {
        const idFromURL = searchParams.get("id")
        if (idFromURL !== selectedElement) _setSelectedElement(idFromURL)
    }, [searchParams])

    function setSelectedElement(id: string | null) {
        _setSelectedElement(id)
        router.push(pathname + '?' + createQueryString('id', id), { scroll: false })

    }

    useEffect(() => {

        if (!popoverRef.current && !anchorPosition) return
        const resizeObserver = new ResizeObserver((entries) => {
            if (!popOverPosition) {
                return
            }
            const newPopOverPosition = getPopOverPosition(anchorPosition!)
            if (!newPopOverPosition) return
            const { x, y, arrowY, arrowX, flipLeft } = newPopOverPosition
            setPopOverPosition({
                x,
                y,
                arrowY,
                arrowX,
                flipLeft
            })
        })
        resizeObserver.observe(popoverRef.current!)
        return () => {
            resizeObserver.disconnect()
        }

    }, [popoverRef, anchorPosition])



    function onNodeClick(e: HierarchyNode<TreeElement>, el: HTMLAnchorElement) {

        setSelectedElement(e.data.id)

    }

    function getPopOverPosition(anchorPosition: { x: number, y: number }): PopOverPosition | undefined {
        const popoverHeight = popoverRef.current?.offsetHeight || 0
        const popoverWidth = popOverWidth || popoverRef.current?.offsetWidth || 0
        // if(popoverWidth === 0 || popoverHeight ===0 ) return
        let flipLeft: boolean = false;
        const x = anchorPosition.x + window.scrollX
        let y = anchorPosition.y + window.scrollY
        const arrowX = x;
        const arrowY = y
        const minY = popoverHeight / 2 + window.scrollY - getAnchorMargin()
        const maxY = window.innerHeight + window.scrollY - popoverHeight / 2 - getAnchorMargin()
        const maxX = window.innerWidth + window.scrollX - popoverWidth

        if (y > maxY) y = maxY
        if (y <= minY) y = minY

        if (x > maxX) {
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

    function onNodeMouseEnter(e: HierarchyNode<TreeElement>, el: HTMLAnchorElement) {
        // refs.setReference(el)

        const domRect = el.getBoundingClientRect()
        const newPopoverPosition = getPopOverPosition(domRect)
        if (!newPopoverPosition) return
        const { x, y, flipLeft, arrowY, arrowX } = newPopoverPosition
        setAnchorPosition({
            x: domRect.x,
            y: domRect.y,
            width: domRect.width,
            height: domRect.height
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
    function onNodeMouseLeave(e: HierarchyNode<TreeElement>, el: HTMLAnchorElement, ev: any) {

        const element = ev.relatedTarget as HTMLDivElement

        if (element?.classList?.contains(styles.arrow)) {
            return
        }
        unsetHoveredElement()
    }

    function unsetHoveredElement() {

        setPopOverPosition(null)
        setHoveredElement(null)
    }

    function renderTree() {
        return (
            <Tree
                _disableUseEffect={true}
                autoPadding={true}
                onNodeClick={onNodeClick}
                onNodeMouseEnter={onNodeMouseEnter}
                onNodeMouseLeave={onNodeMouseLeave}
                onNodeFocusIn={onNodeMouseEnter}
                onNodeFocusOut={onNodeMouseLeave}
                data={treeData!}
                types={treeElementTypes}
                resizeEventStrategy={ResizeEventStrategy.EventListener}

            />
        )
    }

    function getAnchorMargin(): number {
        if (!anchorPosition) return 0
        return anchorPosition.height / 2
    }

    function getArrowStyle(): CSSProperties | undefined {
        if (!popOverPosition || !anchorPosition) return
        const PADDING = 16
        const deltaX = popOverPosition.flipLeft ? PADDING : -PADDING
        let paddingLeft, paddingRight
        if (popOverPosition.flipLeft) paddingRight = PADDING
        else paddingLeft = PADDING
        const yTransform = `calc(-50% + ${getAnchorMargin()}px)`
        const transform = popOverPosition.flipLeft ? `translate(-100%, ${yTransform})` : `translate(${anchorPosition.width}px,${yTransform})`
        return {
            left: popOverPosition.arrowX + deltaX,
            top: popOverPosition.arrowY,
            transform,
            paddingRight,
            paddingLeft,
            // backgroundColor:"red"
        }
    }

    function getPopOverStyle(): CSSProperties | undefined {
        const PADDING = 15;
        if (!popOverPosition || !anchorPosition) return
        let paddingLeft, paddingRight
        const deltaX = popOverPosition.flipLeft ? -PADDING : PADDING
        const yTransform = `calc(-50% + ${getAnchorMargin()}px)`
        const transform = popOverPosition.flipLeft ? `translate(-100%,${yTransform})` : `translate(${anchorPosition.width}px,${yTransform})`
        if (popOverPosition.flipLeft) paddingRight = PADDING
        else paddingLeft = PADDING
        return {
            //backgroundColor:"red",
            left: popOverPosition.x + deltaX,
            top: popOverPosition.y,
            //transform:"translate(-100%,-50%)",
            transform//,
            // paddingRight,
            // paddingLeft
        }
    }

    function getArrowClassName(): string {
        return popOverPosition?.flipLeft ? styles["arrow-right"] : styles["arrow-left"]
    }

    function renderPopOver() {
        let render = null
        if (hoveredElement) {
            render = (
                <div className={styles.popover}>
                    <PreviewWithData id={hoveredElement} />
                </div>
            )
        }
        return (
            <>
                {renderArrow()}
                <div ref={popoverRef} onMouseLeave={onMouseLeave} className={classnames(styles["popover-container"], styles["hide-on-mobile"])} style={getPopOverStyle()}>
                    {render}
                </div>
            </>

        )
    }

    function renderArrow() {
        if (!hoveredElement) return null
        return <div onMouseLeave={onMouseLeave} className={classnames(styles.arrow, getArrowClassName(), styles["hide-on-mobile"])} style={getArrowStyle()} />
    }

    function onMouseLeave(e: React.MouseEvent) {
        const target = e.relatedTarget as HTMLDivElement | undefined
        if (target?.classList?.contains("preview") || target?.classList?.contains(styles.arrow)) return
        unsetHoveredElement()
    }

    function renderInfo() {
        return (
            <header className={"p-2 p-md-0 mt-2"}>
                <h1 >The phylogenetic relationships of living felids</h1>
                <References references={[
                    { title: "Wikipedia", url: "https://en.wikipedia.org/w/index.php?title=Felidae&oldid=1160456585#Classification" }
                ]} />
                <p></p>
            </header>
        )
    }


    function renderModal() {
        if (!selectedElement) return null
        return (

            <ElementInfoModal
                elementId={selectedElement}
                isOpen={!!selectedElement}
                onTreeNodeClick={(id) => {
                    setSelectedElement(id)
                }}
                onClose={() => {
                    setSelectedElement(null)
                    setHoveredElement(null)
                }}
                treeElementTypes={treeElementTypes}
            />


        )
    }


    function renderBadge() {
        return (
            <p className={classnames(styles.badge, "mb-0", "pt-1 pb-1 ps-2 pe-2 small")}>
                Developed By: <a target={"_blank"} rel={"noreferrer"} href={"https://www.antonio-goncalves.com"}>antonio-goncalves.com</a>
            </p>
        )
    }

    return (
        <div className={styles.container}>

            {renderInfo()}
            {renderTree()}
            {renderPopOver()}
            {renderModal()}
            {renderBadge()}
        </div>

    )
}