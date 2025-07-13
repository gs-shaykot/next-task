import clientPromise from "../../../../lib/mongo";
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  origin: 'https://next-task-plum.vercel.app', // Your frontend domain
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function GET() {
  // Run the cors middleware
  await runMiddleware(new Request(), new Response(), cors);

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