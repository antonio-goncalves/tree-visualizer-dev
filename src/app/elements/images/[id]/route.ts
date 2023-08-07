import {NextRequest, NextResponse} from 'next/server'
import {ElementDetails, ElementEntry, ElementImage, ElementPreview, ImageInfo} from "@/app/demo/types";
import * as mongoDB  from  "mongodb";
import {TreeElement} from "@/app/demo/components/Tree";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000";
const _images:ImageInfo[] = [
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

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

interface Error {
    msg:string
}

export async function GET(request: NextRequest, context: { params: {id:string}}):Promise<NextResponse<ImageInfo[] | Error>> {
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
    const images = entry.images.filter(el=>el.photoGallery)

   //  await new Promise(resolve=>setTimeout(resolve,3000))
    return NextResponse.json(images)

}