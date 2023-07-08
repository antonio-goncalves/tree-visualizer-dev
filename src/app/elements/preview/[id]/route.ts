import {NextRequest, NextResponse} from 'next/server'
import {ElementPreview} from "@/app/demo/types";
import * as mongoDB  from  "mongodb";
import {Filter} from "mongodb";
import {ElementDetails} from "../../../../../data";
const elementPreview:ElementPreview = {
    title:"Domestic cat",
    description:" The cat (Felis catus) is a domestic species of small carnivorous mammal.[1][2] It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat",
    image:{
        src:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/2560px-Felis_catus-cat_on_snow.jpg",
        alt:"Domestic cat"
    },
    references:[]
}
const uri = process.env.MONGO_URI || "mongodb://localhost:27017?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000";

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

interface Error {
    msg:string
}

export async function GET(request: NextRequest, context: { params :{id:string}}):Promise<NextResponse<ElementPreview | Error>> {
    await mongoClient.connect()
    const collection = animalsDB.collection<ElementDetails>("cats")


 //   await new Promise(resolve=>setTimeout(resolve,250))
    const id = context.params.id

    const result =  await  collection.findOne({_id:id} as Filter<any>)
    if(!result) {


        return NextResponse.json({
            msg:"Element not found"
        },{
            status:404
        })
    }
    const image = result.images.find(el=>el.main)
    return NextResponse.json({
        title:result.title,
        image:image ,
        description:result.description,
        references:result.references
    })
}