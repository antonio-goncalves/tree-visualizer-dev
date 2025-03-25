import * as mongoDB from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ElementEntry } from "@/app/demo/types";
import { TreeElement } from "@/app/demo/components/Tree";
import { DEFAULT_MONGO_URI } from "@/app/variables";

const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

export async function getTree(): Promise<TreeElement | undefined> {

    await mongoClient.connect()
    const collection = animalsDB.collection<ElementEntry>("cats")

    const elements = await collection.find({}).project({ title: 1, _id: 1, parent: 1, lineage: 1 }).toArray()

    const hm: { [k: string]: Array<{ id: string, name: string, type: string }> } = {}

    for (const element of elements) {
        if (!element.parent) continue
        if (!hm[element.parent]) hm[element.parent] = []
        hm[element.parent].push(
            {
                id: element._id,
                name: element.title,
                type: element.lineage
            }
        )
    }
    const _topElement = elements.find(el => !el.parent)
    if (!_topElement) return
    const topElement = {
        id: _topElement._id,
        name: _topElement.title,
        type: _topElement.lineage
    }
    function getChildElements(element: TreeElement): TreeElement[] | undefined {

        if (!element) return
        const childElements = hm[element.id]
        if (!childElements) return
        return childElements.map(el => ({
            ...el,
            children: getChildElements(el)
        }))


    }

    return {
        ...topElement,
        children: getChildElements(topElement)

    }
}


export async function GET(request: NextRequest): Promise<NextResponse<TreeElement | undefined>> {

    const tree = await getTree()
    return NextResponse.json(tree)
}
