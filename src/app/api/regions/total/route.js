// pages/api/regions/total.ts
import { connectMongoDB } from "@/lib/mongoose";
import { Region } from "@/models/region";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB(); // Connect to the database

  try {
    // Count the number of regions
    const count = await Region.countDocuments();

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching total regions', message: error.message },
      { status: 500 }
    );
  }
}
