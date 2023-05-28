import * as d3 from 'd3'
import {TreeElement} from "@/Tree";
import {DefaultLinkObject, HierarchyNode, Link} from "d3";

interface D3TreeOptions {
    onNodeClick?:(node: HierarchyNode<TreeElement>)=>void
}




// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/tree
export default function D3Tree(data:TreeElement,svgEl:SVGSVGElement,options?:D3TreeOptions):()=>void {

    let { // data is either tabular (array of objects) or hierarchy (nested objects)
        path = undefined, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
        id = /*Array.isArray(data) ? (d:TreeElement) => d.id :*/ null, // if tabular data, given a d in data, returns a unique identifier (string)
        parentId =/* Array.isArray(data) ? d => d.parentId : */null, // if tabular data, given a node d, returns its parent’s identifier
        children = undefined, // if hierarchical data, given a d in data, returns its children
        tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
        sort = undefined, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
        label =(d:TreeElement)=>d.name, // given a node d, returns the display name
        title = undefined, // given a node d, returns its hover text
        link = undefined, // given a node d, its link (if any)
        linkTarget = "_blank", // the target attribute for links (if any)
        width = 640, // outer width, in pixels
        // height= undefined, // outer height, in pixels
        r = 3, // radius of nodes
        padding = 1, // horizontal padding for first and last column
        fill = "#999", // fill for nodes
        fillOpacity = undefined, // fill opacity for nodes
        stroke = "#555", // stroke for links
        strokeWidth = 1.5, // stroke width for links
        strokeOpacity = 0.4, // stroke opacity for links
        strokeLinejoin = undefined, // stroke line join for links
        strokeLinecap = undefined, // stroke line cap for links
        halo = "#fff", // color of label halo
        haloWidth = 3, // padding around the labels
        curve = d3.curveBumpX, // curve for the link
    } = {}
    let height:number | undefined =undefined
    // If id and parentId options are specified, or the path option, use d3.stratify
    // to convert tabular data to a hierarchy; otherwise we assume that the data is
    // specified as an object {children} with nested objects (a.k.a. the “flare.json”
    // format), and use d3.hierarchy.


    /*
    const root = path != null ? d3.stratify().path(path)(data)
        : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
            : d3.hierarchy(data, children);
*/
    const root = d3.hierarchy(data, children);

    // Sort the nodes.
    if (sort != null) root.sort(sort);

    // Compute labels and titles.
    const descendants = root.descendants();
    const L = label == null ? null : descendants.map((d) => label(d.data));

    // Compute the layout.
    const dx = 50;
    const dy = width / (root.height + padding);
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
        .attr("viewBox", [-dy * padding / 2, x0 - dx, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10);
    //@ts-ignore
    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-opacity", strokeOpacity)
        // .attr("stroke-linecap", strokeLinecap)
        // .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", (d3.link(curve) as any) // eslint-disable-line no-use-before-define
            .x((d:any) => d.y) // eslint-disable-line no-use-before-define
            .y((d:any) => d.x)); // eslint-disable-line no-use-before-define


    const node = svg.append("g")
        .selectAll("a")
        .data(root.descendants())
        .join("a")
        //.attr("xlink:href", link == null ? null : d => link(d.data, d))
        //.attr("target", link == null ? null : linkTarget)
        .attr("transform", (d:any) => `translate(${d.y},${d.x})`)
        .attr("pointer","cursor")
        .on("click",(_,el)=>{

            options?.onNodeClick?.(el)
        })

    node.append("circle")
        .attr("fill", d => d.children ? stroke : fill)
        .attr("r", r);

    /*   if (title != null) node.append("title")
           .text(d => title(d.data, d));*/

    if (L) node.append("text")
        .attr("dy", "0.32em")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .attr("paint-order", "stroke")
        .attr("stroke", halo)
        .attr("stroke-width", haloWidth)
        .text((d, i) => L[i]);

    return ()=>{
        svgEl.innerHTML = ""
        while (svgEl.attributes.length > 0) {
            svgEl.removeAttribute(svgEl.attributes[0].name);
        }

    }

}