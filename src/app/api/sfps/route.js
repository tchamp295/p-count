import { connectMongoDB } from '@/lib/mongoose';
import { Sfp } from '@/models/sfp';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectMongoDB(); // Connect to the MongoDB database

  try {
    // Fetch all SFP documents and populate related fields
    const sfps = await Sfp.find({})
      .populate('region', 'regionName') // Populate only the regionName field
      .populate('ip', 'ipName') // Populate only the ipName field
      .exec();

    // Return the SFP records
    return NextResponse.json(sfps, { status: 200 });
  } catch (error) {
    console.error("Error fetching SFPs:", error.message); // Log the error
    return NextResponse.json(
      { error: "Error fetching SFPs", message: error.message },
      { status: 500 }
    );
  }
}
