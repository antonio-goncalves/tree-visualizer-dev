import { NextRequest, NextResponse } from 'next/server'
import { ElementEntry, ElementImage, ElementPreview } from "@/app/demo/types";
import * as mongoDB from "mongodb";
import { Filter } from "mongodb";
import { DEFAULT_MONGO_URI } from '@/app/variables';

const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

interface Error {
    msg: string
}

export async function GET(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse<ElementPreview | Error>> {
    await mongoClient.connect()
    const collection = animalsDB.collection<ElementEntry>("cats")


    //   await new Promise(resolve=>setTimeout(resolve,250))
    const id = context.params.id

    const arr = await collection.aggregate([

        { $match: { _id: id } },
        {
            $lookup: {
                from: "lineages",
                localField: "lineage",
                foreignField: "_id",
                as: "_lineage"

            }
        }

    ]).toArray()


    if (arr.length === 0) {


        return NextResponse.json({
            msg: "Element not found"
        }, {
            status: 404
        })
    }
    const result = arr[0]
    const image = result.images.find((el: ElementImage) => el.preview)
    return NextResponse.json({
        title: result.title,
        image: image,
        subTitle: result._lineage?.[0]?.title,
        subTitleColor: result._lineage?.[0]?.color,
        description: result.description,
        references: result.references
    })
}