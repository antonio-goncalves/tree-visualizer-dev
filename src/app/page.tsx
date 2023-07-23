import Image from 'next/image'
import Tree, {TreeElement, TreeElementType} from "@/app/demo/components/Tree";
import {useRef} from "react";
import Index from "@/app/demo";
import {getTree} from "@/app/elements/tree/route";
import {getLineages} from "@/app/elements/lineage/methods";
import Modal from "@/app/demo/components/Modal";


export default async function Home() {
    const lineages = await getLineages()
    const _lineages = lineages.map(el=>({...el,id:el._id}))
    const treeData = await getTree()

    if(!treeData){
        return (    <main>

           Data missing
        </main>)
    }

    //return <Modal/>
  return (
    <main>

      <Index treeElementTypes={_lineages} treeData={treeData}/>
    </main>
  )
}
