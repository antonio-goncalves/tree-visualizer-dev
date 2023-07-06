import * as mongoDB from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000";

import {NextRequest, NextResponse} from "next/server";
import {ElementPreview} from "@/app/demo/types";
import {ElementDetails} from "../../../../data";
import {Filter} from "mongodb";
import {TreeElement} from "@/app/demo/components/Tree";
const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

export async function getTree():Promise<TreeElement | undefined>{
    console.log("getTree")
    await mongoClient.connect()
    const collection = animalsDB.collection<ElementDetails>("cats")

    const elements = await collection.find({}).project({title:1,_id:1,parent:1}).toArray()

    const hm:{[k:string]:Array<{id:string,name:string}>} = {}

    for(const element of elements){
        if(!element.parent) continue
        if(!hm[element.parent]) hm[element.parent] = []
        hm[element.parent].push(
            {
                id:element._id,
                name:element.title
            }
        )
    }
    const _topElement = elements.find(el=>!el.parent)
    if(!_topElement) return
    const topElement = {
        id:_topElement._id,
        name:_topElement.title
    }
    function getChildElements(element:TreeElement):TreeElement[] | undefined{

        if(!element) return

        const childElements = hm[element.id]
        if(!childElements) return
        return childElements.map(el=>({
            ...el,
            children:getChildElements(el)
        }))


    }

    const tree = {
        ...topElement,
        children:getChildElements(topElement)

    }
    return tree
}


export async function GET(request: NextRequest):Promise<NextResponse<TreeElement | undefined>> {

    const tree = await getTree()
    return NextResponse.json(tree)
}
