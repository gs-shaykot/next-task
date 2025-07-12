import clientPromise from "../../../../lib/mongo";

export async function GET() {
    const client = await clientPromise;
    const db = client.db();
    const reviews = await db.collection('reviews').find().sort({ date: -1 }).toArray();

    return Response.json(reviews);
}

export async function POST(req) {
    const client = await clientPromise;
    const db = client.db();
    const data = await req.json();

    if (!data.comment || !data.rating) {
        return Response.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const review = {
        rating: data.rating,
        comment: data.comment,
        user: data.user || 'Anonymous',
        collegeId: data.collegeId || null,
        date: new Date(),
    };

    const result = await db.collection('reviews').insertOne(review);
    return Response.json({ success: true, review: { ...review, _id: result.insertedId } });
}