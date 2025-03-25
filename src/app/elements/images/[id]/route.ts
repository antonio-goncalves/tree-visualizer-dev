import { NextRequest, NextResponse } from 'next/server'
import { ElementDetails, ElementEntry, ElementImage, ElementPreview, ImageInfo } from "@/app/demo/types";
import * as mongoDB from "mongodb";
import { TreeElement } from "@/app/demo/components/Tree";
import { DEFAULT_MONGO_URI } from '@/app/variables';

const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

interface Error {
    msg: string
}

export async function GET(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse<ImageInfo[] | Error>> {
    await mongoClient.connect()
    const collection = animalsDB.collection<ElementEntry>("cats")


    //   await new Promise(resolve=>setTimeout(resolve,250))

    const id = context.params.id

    interface AggregateResponse {
        images?: ElementImage[],
        children?: {
            images?: ElementImage[]
        }
    }
    const res = await collection.aggregate<AggregateResponse>(
        [
            { $project: { images: 1 } },
            { $match: { _id: id } },
            {
                $graphLookup: {
                    from: "cats",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parent",
                    as: "children"
                }
            },
            {
                $unwind:
                {
                    path: "$children",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind:
                {
                    path: "$children.images",
                    preserveNullAndEmptyArrays: true
                }
            }


        ]).toArray()

    const parentImages = res[0]?.images || []
    //@ts-ignore
    const childImages = res.filter(el => el.children?.images).map(el => el.children!.images!) as ElementImage[]
    const images: ElementImage[] = [...parentImages, ...childImages]
    //  await new Promise(resolve=>setTimeout(resolve,3000))
    return NextResponse.json(images.filter(el => el.photoGallery))

    // const images = entry.images.filter(el=>el.photoGallery)


    //return NextResponse.json(images)

}