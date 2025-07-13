import clientPromise from "../../../../lib/mongo";
 
export async function GET() { 

  const client = await clientPromise;
  const db = client.db("CollegeDb");
  const reviews = await db.collection('reviews').find().sort({ date: -1 }).toArray();

  return new Response(JSON.stringify(reviews), { status: 200 });
}

export async function POST(req) {
  // Run the cors middleware
  await runMiddleware(req, new Response(), cors);

  const client = await clientPromise;
  const db = client.db();
  const data = await req.json();

  if (!data.comment || !data.rating) {
      return new Response(JSON.stringify({ success: false, message: 'Missing fields' }), { status: 400 });
  }

  const review = {
      rating: data.rating,
      comment: data.comment,
      user: data.user || 'Anonymous',
      collegeId: data.collegeId || null,
      date: new Date(),
  };

  const result = await db.collection('reviews').insertOne(review);
  return new Response(JSON.stringify({ success: true, review: { ...review, _id: result.insertedId } }), { status: 200 });
}