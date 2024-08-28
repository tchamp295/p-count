import { connectToDatabase } from '@/lib/dbConfig'; // Ensure this points to your correct dbConfig path

export async function POST(req) {
  // Parse the request body
  const {
    ipName,
    ipTelephone,
    ipEmailAddress,
    ipPostalAddress,
    ipPhysicalLocation,
    ipContactPerson,
    ipContactTelephone,
    ipContactEmail,
  } = await req.json();

  // Validate the input
  if (
    !ipName ||
    !ipTelephone ||
    !ipEmailAddress ||
    !ipPostalAddress ||
    !ipPhysicalLocation ||
    !ipContactPerson ||
    !ipContactTelephone ||
    !ipContactEmail
  ) {
    return new Response(
      JSON.stringify({ message: 'All fields are required' }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    const db = await connectToDatabase();
    const pool = await db.connect();

    // Check if the IP already exists (if applicable)
    const existingIp = await pool
      .request()
      .input('ipName', db.VarChar, ipName)
      .query('SELECT * FROM Ips WHERE ip_name = @ipName');

    if (existingIp.recordset.length > 0) {
      return new Response(
        JSON.stringify({ message: 'IP already exists' }),
        { status: 400 }
      );
    }

    // Insert the new IP into the database
    await pool
      .request()
      .input('ipName', db.VarChar, ipName)
      .input('ipTelephone', db.VarChar, ipTelephone)
      .input('ipEmailAddress', db.VarChar, ipEmailAddress)
      .input('ipPostalAddress', db.VarChar, ipPostalAddress)
      .input('ipPhysicalLocation', db.VarChar, ipPhysicalLocation)
      .input('ipContactPerson', db.VarChar, ipContactPerson)
      .input('ipContactTelephone', db.VarChar, ipContactTelephone)
      .input('ipContactEmail', db.VarChar, ipContactEmail)
      .query(`
        INSERT INTO Ips (
          ip_name,
          ip_telephone,
          ip_email_address,
          ip_postal_address,
          ip_physical_location,
          ip_contact_person,
          ip_contact_telephone,
          ip_contact_email
        ) VALUES (
          @ipName,
          @ipTelephone,
          @ipEmailAddress,
          @ipPostalAddress,
          @ipPhysicalLocation,
          @ipContactPerson,
          @ipContactTelephone,
          @ipContactEmail
        )
      `);

    // Return a success response
    return new Response(
      JSON.stringify({ message: 'IP added successfully' }),
      { status: 201 }
    );
  } catch (err) {
    console.error('Error adding IP:', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
