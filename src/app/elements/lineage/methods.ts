import { NextRequest, NextResponse } from 'next/server'
import { Lineage } from "@/app/demo/types";
import * as mongoDB from "mongodb";
import { WithId } from "mongodb";
import { DEFAULT_MONGO_URI } from '@/app/variables';

const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

interface Error {
    msg: string
}

export async function getLineages(): Promise<Lineage[]> {
    await mongoClient.connect()
    const collection = animalsDB.collection<Lineage>("lineages")


    //   await new Promise(resolve=>setTimeout(resolve,250))


    return collection.find().toArray()
}

