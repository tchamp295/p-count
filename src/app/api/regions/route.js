// /pages/api/regions.js

import { connectToDatabase } from '@/lib/dbConfig'; // Ensure this points to your correct dbConfig path

export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    const pool = await db.connect();

    // Fetch regions from the database
    const result = await pool.request().query('SELECT * FROM regions');
console.log(result)
    // Return the regions as a JSON response
    return new Response(
      JSON.stringify(result.recordset),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error fetching regions:', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
