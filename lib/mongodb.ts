import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGDB_URI, {
            dbName: "futureskill"
        })
        console.log("Connected to MongoDB")

    } catch (err) {
        console.error("Error connecting to MongoDb: ", err)
    }
}