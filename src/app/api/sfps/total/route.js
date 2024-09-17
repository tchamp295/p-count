// pages/api/sfps/total.ts
import { connectMongoDB } from '@/lib/mongoose';
import { Sfp } from '@/models/sfp';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectMongoDB(); // Connect to the MongoDB database

  try {
    // Count the total number of SFP documents
    const totalSfps = await Sfp.countDocuments({});

    // Return the total count
    return NextResponse.json({ count: totalSfps }, { status: 200 });
  } catch (error) {
    console.error("Error fetching total SFPs:", error.message); // Log the error
    return NextResponse.json(
      { error: "Error fetching total SFPs", message: error.message },
      { status: 500 }
    );
  }
}
