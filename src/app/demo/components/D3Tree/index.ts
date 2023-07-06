import * as d3 from 'd3'
import {TreeElement} from "@/app/demo/components/Tree";
import {DefaultLinkObject, HierarchyLink, HierarchyNode, Link} from "d3";

interface D3TreeOptions {
    onNodeClick?:(node: HierarchyNode<TreeElement>, el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseOver?:(node: HierarchyNode<TreeElement>, el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseEnter?:(node: HierarchyNode<TreeElement>, el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeMouseLeave?:(node: HierarchyNode<TreeElement>, el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeFocusIn?:(node: HierarchyNode<TreeElement>, el:HTMLAnchorElement,ev:MouseEvent)=>void,
    onNodeFocusOut?:(node: HierarchyNode<TreeElement>, el:HTMLAnchorElement,ev:MouseEvent)=>void,
    width?:number,
    leftPadding?:number,
    rightPadding?:number
    padding?:number
}

const DEFAULT_PADDING = 100;
const TEXT_PADDING = 10
const CIRCLE_RADIUS = 5;
const CIRCLE_RADIUS_OVER = 7;


// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/tree
export default function D3Tree(data:TreeElement,svgEl:SVGSVGElement,options?:D3TreeOptions):()=>void {

    const tree = d3.tree // layout algorithm (typically d3.tree or d3.cluster)
    const sort = undefined // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
    const label =(d:TreeElement)=>d.name // given a node d, returns the display name

    const width = options?.width || 1240 // outer width, in pixels
    // height= undefined, // outer height, in pixels

    const fill = "#999" // fill for nodes
    const stroke = "#555" // stroke for links
    const strokeWidth = 1.5 // stroke width for links
    const strokeOpacity = 0.4 // stroke opacity for links
    const haloWidth = 3 // padding around the labels
    const curve = d3.curveBumpX // curve for the link


    let height:number | undefined =undefined
    // If id and parentId options are specified, or the path option, use d3.stratify
    // to convert tabular data to a hierarchy; otherwise we assume that the data is
    // specified as an object {children} with nested objects (a.k.a. the “flare.json”
    // format), and use d3.hierarchy.



    const leftPadding = options?.leftPadding || options?.padding || DEFAULT_PADDING
    const rightPadding = options?.rightPadding || options?.padding || DEFAULT_PADDING


    const innerWidth = width - (leftPadding + rightPadding)

    /*
    const root = path != null ? d3.stratify().path(path)(data)
        : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
            : d3.hierarchy(data, children);
*/
    const root = d3.hierarchy(data);

    // Sort the nodes.
    if (sort != null) root.sort(sort);

    // Compute labels and titles.
    const descendants = root.descendants();
    const L = label == null ? null : descendants.map((d) => label(d.data));

    // Compute the layout.
    const dx = 30;


    const dy = innerWidth /root.height;

    tree<TreeElement>().nodeSize([dx, dy])(root);


    // Center the tree.
    let x0 = Infinity;
    let x1 = -x0;
    root.each((d:any) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the default height.
    if (height === undefined) height = x1 - x0 + dx * 2;

    // Use the required curve
    if (typeof curve !== "function") throw new Error(`Unsupported curve`);

    const svg = d3.select(svgEl)
        .attr("viewBox", [-leftPadding  , x0 - dx, width , height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", `
            max-width: 100%; 
            height: auto; 
            height: intrinsic;
        `)
       // .attr("font-family", "sans-serif")
       // .attr("font-size", 14);


    //@ts-ignore
    const lines = svg.append("g").attr("fill", "none")

        lines.attr("stroke", stroke)
        .attr("stroke-opacity", strokeOpacity)
        // .attr("stroke-linecap", strokeLinecap)
        // .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .selectAll("path")
         .data(root.links())
        .join("path")
        .attr("d", (d3.link(curve) as any) // eslint-disable-line no-use-before-define
            .x((d:any) => d.y) // eslint-disable-line no-use-before-define
            .y((d:any) => d.x)) // eslint-disable-line no-use-before-define
        .attr("stroke", (d:any)=>{
            const source = d.source
            const color = source.data.color


            return color
        })

    function nodeFocusIn(ev: MouseEvent){
        const element = ev.currentTarget as HTMLAnchorElement
        element?.querySelector("circle")?.setAttribute("r",CIRCLE_RADIUS_OVER.toString())
        element?.querySelector("text")?.setAttribute("font-weight","bold")
    }

    function nodeFocusOut(ev: MouseEvent){
        const element = ev.currentTarget as HTMLElement
        element?.querySelector("circle")?.setAttribute("r",CIRCLE_RADIUS.toString())
        element?.querySelector("text")?.setAttribute("font-weight","400")
    }
    const node = svg.append("g")
        .selectAll("a")
        .data(root.descendants())
        .join("a")
        //.attr("xlink:href", link == null ? null : d => link(d.data, d))
        //.attr("target", link == null ? null : linkTarget)
        .attr("transform", (d:any) => `translate(${d.y},${d.x})`)
        .attr("pointer","cursor")
        .attr("role","button")
        .attr("tabindex",0)
        .on("keydown",(event,el)=>{
            if(event.key === "Enter"){
                const element = event.currentTarget as HTMLAnchorElement
                options?.onNodeClick?.(el,element,event)
            }
            if(event.key ==="Tab"){
                //options?.onNodeMouseOver?.(el)
            }
        })
        .on("click",(ev:MouseEvent,el)=>{
            const element = ev.currentTarget as HTMLAnchorElement
            console.log(ev.target)
            options?.onNodeClick?.(el,element,ev)
        })
        .on("mouseover",(ev:MouseEvent,el)=>{
            const element = ev.currentTarget as HTMLAnchorElement
           options?.onNodeMouseOver?.(el,element,ev)

        })
        .on("mouseenter",   (ev:MouseEvent,el)=>{
            const element = ev.currentTarget as HTMLAnchorElement
            options?.onNodeMouseEnter?.(el,element,ev)
            nodeFocusIn(ev)
        })
        .on("mouseleave",(ev:MouseEvent,el)=>{
            const element = ev.currentTarget as HTMLAnchorElement
            options?.onNodeMouseLeave?.(el,element,ev)
            nodeFocusOut(ev)
        }).on("focusin",(ev:MouseEvent,el)=>{
            const element = ev.currentTarget as HTMLAnchorElement
            options?.onNodeFocusIn?.(el,element,ev)
            nodeFocusIn(ev)
        })
        .on("focusout",(ev:MouseEvent,el)=>{
            const element = ev.currentTarget as HTMLAnchorElement
            options?.onNodeFocusOut?.(el,element,ev)
            nodeFocusOut(ev)
        })

    node.append("circle")
        .attr("fill", d => fill)
        .attr("r", CIRCLE_RADIUS);



    if(L) node.append("text")
        .attr("dy", "0.32em")
        .attr("x", d => d.children ? -TEXT_PADDING : TEXT_PADDING)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .attr("paint-order", "stroke")
       // .attr("stroke", halo) //Bug with gesture zoom
        .attr("stroke-width", haloWidth)
        .text(()=>"text")
        .text((d, i) => L[i]);

    return ()=>{
        svgEl.innerHTML = ""
        while (svgEl.attributes.length > 0) {
            svgEl.removeAttribute(svgEl.attributes[0].name);
        }

    }

}