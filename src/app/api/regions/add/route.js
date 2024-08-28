// api/regions/add/route.js

import { connectToDatabase } from '@/lib/dbConfig'; // Ensure this points to your correct dbConfig path

export async function POST(req) {
  // Parse the request body
  const { regionName } = await req.json();

  // Validate the input
  if (!regionName) {
    return new Response(JSON.stringify({ message: 'Region name is required' }), {
      status: 400,
    });
  }

  try {
    // Connect to the database
    const db = await connectToDatabase();
    const pool = await db.connect();

    // Check if the region already exists
    const existingRegion = await pool
      .request()
      .input('regionName', db.VarChar, regionName)
      .query('SELECT * FROM Regions WHERE region_name = @regionName');

    if (existingRegion.recordset.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Region already exists' }),
        { status: 400 }
      );
    }

    // Insert the new region into the database
    await pool
      .request()
      .input('regionName', db.VarChar, regionName)
      .query('INSERT INTO Regions (region_name) VALUES (@regionName)');

    // Return a success response
    return new Response(
      JSON.stringify({ message: 'Region added successfully' }),
      { status: 201 }
    );
  } catch (err) {
    console.error('Error adding region:', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
