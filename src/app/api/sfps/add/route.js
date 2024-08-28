import { connectToDatabase } from '@/lib/dbConfig'; // Ensure this points to your correct dbConfig path

export async function POST(req) {
  // Parse the request body
  const {
    ipName,
    sfpName,
    sfpEmail,
    sfpTelephone,
    gender,
    region,
  } = await req.json();

  // Validate the input
  if (!ipName || !sfpName || !sfpEmail || !sfpTelephone || !gender || !region) {
    return new Response(
      JSON.stringify({ message: 'All fields are required' }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    const db = await connectToDatabase();
    const pool = await db.connect();

    // Check if the SFP already exists (if applicable)
    const existingSfp = await pool
      .request()
      .input('sfpName', db.VarChar, sfpName)
      .query('SELECT * FROM Sfps WHERE sfp_name = @sfpName');

    if (existingSfp.recordset.length > 0) {
      return new Response(
        JSON.stringify({ message: 'SFP already exists' }),
        { status: 400 }
      );
    }

    // Insert the new SFP into the database
    await pool
      .request()
      .input('ipName', db.VarChar, ipName)
      .input('sfpName', db.VarChar, sfpName)
      .input('sfpEmail', db.VarChar, sfpEmail)
      .input('sfpTelephone', db.VarChar, sfpTelephone)
      .input('gender', db.VarChar, gender)
      .input('region', db.VarChar, region)
      .query(`
        INSERT INTO Sfps (
          ip_name,
          sfp_name,
          sfp_email,
          sfp_telephone,
          gender,
          region
        ) VALUES (
          @ipName,
          @sfpName,
          @sfpEmail,
          @sfpTelephone,
          @gender,
          @region
        )
      `);

    // Return a success response
    return new Response(
      JSON.stringify({ message: 'SFP added successfully' }),
      { status: 201 }
    );
  } catch (err) {
    console.error('Error adding SFP:', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
