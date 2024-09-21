import { connectMongoDB } from "@/lib/mongoose";
import { Sfp } from "@/models/sfp";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongoDB();

  try {
    const { phoneNumber, uniqueNumber } = await req.json();

    // Check if the user exists
    const user = await Sfp.findOne({ sfpTelephone: phoneNumber });

    if (user) {
      // User exists, return a random number and the unique number
      const randomNumber = Math.floor(Math.random() * 10000); // Example random number
      return NextResponse.json(
        { exists: true, randomNumber, uniqueNumber },
        { status: 200 }
      );
    } else {
      // User does not exist
      return NextResponse.json({ exists: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in POST:", error.message); // Log the error
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
