// /api/sfps/route.js

import { connectToDatabase } from '@/lib/dbConfig'; // Ensure this path is correct

export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    const pool = await db.connect();

    // Fetch data from the 'sfps' table
    const result = await pool.request().query('SELECT * FROM sfps');
    console.log(result); // Optional: For debugging

    // Return the data as a JSON response
    return new Response(
      JSON.stringify(result.recordset),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error fetching data:', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
