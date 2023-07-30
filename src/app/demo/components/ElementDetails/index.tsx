import Tree, {TreeElement, TreeElementType} from "@/app/demo/components/Tree";
import classnames from "classnames";


export interface ElementDetailsProps {
    name:string,
    id:string,
    description:string,
    type?:string,
    treeElement:TreeElement,
    treeElementTypes?:TreeElementType[]
}

const treeElement:TreeElement = {
    "id": "felinae",
    "name": "Felinae",
    "children": [
        {
            "id": "felis",
            "name": "Felis",
            "type": "domesticCat",
            "children": [
                {
                    "id": "jungleCat",
                    "name": "Jungle cat",
                    "type": "domesticCat"
                },
                {
                    "id": "blackFootedCat",
                    "name": "Black-footed cat",
                    "type": "domesticCat"
                },
                {
                    "id": "sandCat",
                    "name": "Sand cat",
                    "type": "domesticCat"
                },
                {
                    "id": "chineseMountainCat",
                    "name": "Chinese mountain cat",
                    "type": "domesticCat"
                },
                {
                    "id": "africanWildcat",
                    "name": "African wildcat",
                    "type": "domesticCat"
                },
                {
                    "id": "europeanWildcat",
                    "name": "European wildcat",
                    "type": "domesticCat"
                },
                {
                    "id": "cat",
                    "name": "Cat",
                    "type": "domesticCat"
                }
            ]
        }
    ]
}
export default function ElementDetails({treeElement,type,name,id,description,treeElementTypes}:ElementDetailsProps){

    function renderParagraphs(){
        const paragraphs = description.split("\n")
        return paragraphs.map((p,i)=>(
            <p key={i} className={classnames({"mb-0":i===paragraphs.length-1})}>{p}</p>
        ))
    }
    return (
        <div>
            <h1>{name}</h1>
            {renderParagraphs()}
            <Tree
                leftPadding={65}
                rightPadding={183}

                treeElement={treeElement}
                treeElementTypes={treeElementTypes || []}
            />

        </div>
    )
}