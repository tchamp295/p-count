// /pages/api/sfpsCount.js

import { connectToDatabase } from '@/lib/dbConfig'; // Ensure this points to your correct dbConfig path

export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    const pool = await db.connect();

    // Fetch the count of SFPS from the database
    const result = await pool.request().query('SELECT COUNT(*) AS count FROM sfps'); // Adjust query as needed
    const count = result.recordset[0].count;

    // Return the count as a JSON response
    return new Response(
      JSON.stringify({ count }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error fetching SFPS count:', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
