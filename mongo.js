import { MDBURI } from "./config.js"
import {MongoClient, ServerApiVersion} from "mongodb"
const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
const myDatabase = client.db("sample_analytics")
const myCollection = myDatabase.collection("customers")
const myTransactions = myDatabase.collection("transactions")
export {myCollection, myTransactions}