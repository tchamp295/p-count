import { connectToDatabase } from '@/lib/dbConfig';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: 'Email and password are required' }),
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const pool = await db.connect();

    // Check if the email is already taken
    const existingUser = await pool.request()
      .input('email', db.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    
    if (existingUser.recordset.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Email is already taken' }),
        { status: 400 }
      );
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.request()
      .input('email', db.VarChar, email)
      .input('password', db.VarChar, hashedPassword)
      .query('INSERT INTO Users (email, password) VALUES (@email, @password)');

    // Return a success message
    return new Response(
      JSON.stringify({ message: 'User created successfully' }),
      { status: 201 }
    );

  } catch (err) {
    console.error('Signup error:', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
