import Image from 'next/image'
import Tree, {TreeElement} from "@/app/demo/components/Tree";
import {useRef} from "react";
import Index from "@/app/demo";
import {getTree} from "@/app/elements/tree/route";


export default async function Home() {
    const treeData = await getTree()

    if(!treeData){
        return (    <main>

           Data missing
        </main>)
    }

  return (
    <main>

      <Index treeData={treeData}/>
    </main>
  )
}
