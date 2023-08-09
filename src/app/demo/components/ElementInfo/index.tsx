import Tree, {TreeElement, TreeElementType} from "@/app/demo/components/Tree";
import classnames from "classnames";
import {ElementDetails, ImageInfo, Reference} from "@/app/demo/types";
import References from "@/app/demo/components/References";
import {HierarchyNode} from "d3";
import PhotoGallery from "@/app/demo/components/PhotoGallery";
import PhotoGalleryWithData from "@/app/demo/components/PhotoGalleryWithData";
import {NodeOptions} from "@/app/demo/components/D3Tree";

export interface ElementInfoProps extends ElementDetails{

    treeElementTypes?:TreeElementType[],
    onTreeNodeClick?:(id:string)=>void
}


export default function ElementInfo({treeElement,type,title,id,description,treeElementTypes,subTitleColor,subTitle,references,onTreeNodeClick}:ElementInfoProps){


    console.log(!!treeElement.children?.[0].children?"Y":"N")
    function getTreeOptions():NodeOptions[] | undefined{
        //@ts-ignore
        if(treeElement?.children?.[0].children?.length>0){
            return [
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

        const nodeOptions:NodeOptions[] = [
         /*   {
                depth:1,
                y:(n)=>{
                    return -12
                }
            }*/
        ]

        return (

            <Tree
                autoPadding={true}
                selectedElement={id}
                data={treeElement}
                types={treeElementTypes || []}
                onNodeClick={_onTreeNodeClick}
                nodeOptions={getTreeOptions()}

            />

        )
    }

    return (
        <div style={{border:"0px solid red"}}>
            <h1>{title}</h1>
            {renderSubTitle()}
            <References references={references} className={"mb-2"} />
            {renderParagraphs()}
            <PhotoGalleryWithData className={"mt-4 mb-4"} id={id} />
            {renderTree()}
        </div>
    )
}