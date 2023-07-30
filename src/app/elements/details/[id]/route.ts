import {NextRequest, NextResponse} from 'next/server'
import {ElementEntry, ElementImage, ElementPreview} from "@/app/demo/types";
import * as mongoDB  from  "mongodb";
import {Filter} from "mongodb";
import {ElementDetailsProps} from "@/app/demo/components/ElementDetails";
import {TreeElement} from "@/app/demo/components/Tree";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000";

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

interface Error {
    msg:string
}

export async function GET(request: NextRequest, context: { params: {id:string}}):Promise<NextResponse<ElementDetailsProps | Error>> {
    await mongoClient.connect()
    const collection = animalsDB.collection<ElementEntry>("cats")


    //   await new Promise(resolve=>setTimeout(resolve,250))

    const id = context.params.id
    const entry = await collection.findOne({_id:id})
    if(!entry){
        return NextResponse.json({
            msg:"Element not found"
        },{
            status:404
        })
    }
    let parent
    const projection = {title:1,_id:1,lineage:1}
    if(entry?.parent){
        parent = await collection.findOne({_id:entry.parent},{projection})
    }
    let entryTreeElement:TreeElement = {
        id:entry._id,
        name:entry.title,
        type:entry.lineage
    }
    let parentTreeElement:TreeElement | undefined
    if(parent){
        parentTreeElement = {
            id:parent._id,
            name:parent.title,
            type:parent.lineage,
            children:[entryTreeElement]
        }
    }
    const children = await collection.find({parent:entry._id}).project(projection).toArray()
    entryTreeElement.children =  children.map(el=>(
        {
            id:el._id,
            name:el.title,
            type:el.lineage
        }
    ))
    const treeElement = parentTreeElement?parentTreeElement:entryTreeElement
   // await new Promise(resolve=>setTimeout(resolve,3000))
    return NextResponse.json({
        id:entry._id,
        title:entry.title,
        type:entry.lineage,
        description:entry.description,
        treeElement,
        references:entry.references
    })

}