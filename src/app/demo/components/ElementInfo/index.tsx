import Tree, {TreeElement, TreeElementType} from "@/app/demo/components/Tree";
import classnames from "classnames";
import {ElementDetails, Reference} from "@/app/demo/types";
import References from "@/app/demo/components/References";
import {HierarchyNode} from "d3";
import PhotoGallery from "@/app/demo/components/PhotoGallery";

export interface ElementInfoProps extends ElementDetails{

    treeElementTypes?:TreeElementType[],
    onTreeNodeClick?:(id:string)=>void
}



export default function ElementInfo({treeElement,type,title,id,description,treeElementTypes,subTitleColor,subTitle,references,onTreeNodeClick}:ElementInfoProps){

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
        return (

            <Tree
                leftPadding={65}
                rightPadding={183}
                treeElement={treeElement}
                treeElementTypes={treeElementTypes || []}
                onNodeClick={_onTreeNodeClick}
            />

        )
    }
    return <PhotoGallery />
    return (
        <div>
            <h1>{title}</h1>
            {renderSubTitle()}
            <References references={references} />
            {renderParagraphs()}
            {renderTree()}
        </div>
    )
}