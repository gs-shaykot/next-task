import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongo";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("CollegeDb");
        const collection = db.collection("appliedOn");

        const body = await request.json();
        const result = await collection.insertOne(body);

        return Response.json({ success: true, result });
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("CollegeDb");
        const collection = db.collection("appliedOn");

        const data = await collection.find().toArray();
        return Response.json(data);
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const client = await clientPromise;
        const db = client.db("CollegeDb");
        const collection = db.collection("appliedOn");

        const { _id, candidateName } = await request.json();

        if (!_id || !ObjectId.isValid(_id)) {
            return Response.json({ success: false, message: "Invalid ID" }, { status: 400 });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { candidateName } }
        );

        return Response.json({ success: true, result });
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}

