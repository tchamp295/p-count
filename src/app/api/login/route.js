import { connectMongoDB } from "@/lib/mongoose";
import { Sfp } from "@/models/sfp";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongoDB();

  try {
    const { phoneNumber, uniqueNumber } = await req.json();

   
    const user = await Sfp.findOne({ sfpTelephone: phoneNumber });

    if (user) {
    
      const randomNumber = Math.floor(Math.random() * 10000); 
      return NextResponse.json(
        { exists: true, randomNumber, uniqueNumber },
        { status: 200 }
      );
    } else {
    
      return NextResponse.json({ exists: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in POST:", error.message); 
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
