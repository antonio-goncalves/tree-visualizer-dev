import {NextRequest, NextResponse} from 'next/server'
import { Lineage} from "@/app/demo/types";
import * as mongoDB  from  "mongodb";
import { WithId} from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000";

const mongoClient = new mongoDB.MongoClient(uri);
const animalsDB = mongoClient.db("animals");

interface Error {
    msg:string
}

export async function getLineages():Promise<Lineage[]>{
    await mongoClient.connect()
    const collection = animalsDB.collection<Lineage>("lineages")


    //   await new Promise(resolve=>setTimeout(resolve,250))


    return collection.find().toArray()
}

