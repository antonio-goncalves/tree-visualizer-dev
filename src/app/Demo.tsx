"use client"

import Tree, {TreeElement} from "@/Tree";
const treeElement:TreeElement = {
    id:"root",
    name:"root",
    children:[
        {
            id:1,
            name:"a",
            children:[
                {
                    id:2,
                    name:"a_a"
                },
                {
                    id:3,
                    name:"a_b"
                }
            ]
        },
        {
            id:4,
            name:"b",
            children:[
                {
                    id:5,
                    name:"b_a"
                },
                {
                    id:6,
                    name:"b_b",
                    children:[
                        {
                            id:7,
                            name:"b_b_a"
                        }
                    ]
                }
            ]
        }
    ]

}

export default function Demo(){
    return (
        <Tree
            onNodeClick={(e)=>{
                console.log(e.data.name)
            }}
            treeElement={treeElement}/>
    )
}