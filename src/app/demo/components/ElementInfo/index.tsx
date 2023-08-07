import Tree, {TreeElement, TreeElementType} from "@/app/demo/components/Tree";
import classnames from "classnames";
import {ElementDetails, ImageInfo, Reference} from "@/app/demo/types";
import References from "@/app/demo/components/References";
import {HierarchyNode} from "d3";
import PhotoGallery from "@/app/demo/components/PhotoGallery";
import PhotoGalleryWithData from "@/app/demo/components/PhotoGalleryWithData";

export interface ElementInfoProps extends ElementDetails{

    treeElementTypes?:TreeElementType[],
    onTreeNodeClick?:(id:string)=>void
}
const images:ImageInfo[] = [
    {
        alt:"xx",
        src:"https://static.antonio-goncalves.com/images/test/1.jpg",
        description:"description",
        label:"label",
        reference:{
            title:"Wikipedia",
            url:"https://www.wikipedia.com"
        }
    },
    {
        alt:"xx2",
        src:"https://static.antonio-goncalves.com/images/test/2.jpg",
        reference:{
            title:"Wikipedia",
            url:"https://www.wikipedia.com"
        }
    },
    {
        alt:"xx",
        src:"https://static.antonio-goncalves.com/images/test/3.jpg",
        reference:{
            title:"Wikipedia",
            url:"https://www.wikipedia.com"
        }
    },
    {
        alt:"xx",
        src:"https://static.antonio-goncalves.com/images/test/4.jpg",
        reference:{
            title:"Wikipedia",
            url:"https://www.wikipedia.com"
        }
    },
    {
        alt:"xx",
        src:"https://static.antonio-goncalves.com/images/test/5.jpg",
        reference:{
            title:"Wikipedia",
            url:"https://www.wikipedia.com"
        }
    }
]



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

    return (
        <div>
            <h1>{title} - {id}</h1>
            {renderSubTitle()}
            <References references={references} className={"mb-2"} />
            {renderParagraphs()}
            <PhotoGalleryWithData className={"mt-4 mb-4"} id={id} />
            {renderTree()}
        </div>
    )
}