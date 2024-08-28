import { connectToDatabase } from "@/lib/dbConfig";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required" }),
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const pool = await db.connect();

    const result = await pool
      .request()
      .input("email", db.VarChar, email)
      .query("SELECT id, email, password, isAdmin FROM Users WHERE email = @email");

    const user = result.recordset[0];

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // If the credentials are valid, return the user data
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}


