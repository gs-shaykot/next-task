import clientPromise from "../../../../lib/mongo";

// Handle GET request - fetch reviews
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("CollegeDb");

    const reviews = await db.collection("reviews")
      .find()
      .sort({ date: -1 })
      .toArray();

    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://next-task-plum.vercel.app",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "https://next-task-plum.vercel.app",
      },
    });
  }
}

// Handle POST request - add new review
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("CollegeDb");

    const data = await req.json();

    if (!data.comment || !data.rating) {
      return new Response(JSON.stringify({ success: false, message: "Missing fields" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "https://next-task-plum.vercel.app",
        },
      });
    }

    const review = {
      rating: data.rating,
      comment: data.comment,
      name: data?.name,
      university: data.university ,
      date: new Date(),
    };

    const result = await db.collection("reviews").insertOne(review);

    return new Response(JSON.stringify({
      success: true,
      review: { ...review, _id: result.insertedId },
    }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://next-task-plum.vercel.app",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "https://next-task-plum.vercel.app",
      },
    });
  }
}

// Handle preflight OPTIONS request (for CORS)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://next-task-plum.vercel.app",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
