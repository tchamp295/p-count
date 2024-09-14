import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongoose';
import { Region } from '@/models/region';

export async function POST(req) {
  await connectMongoDB(); // Ensure the MongoDB connection is established

  try {
    const { regionName } = await req.json();

    if (!regionName) {
      return NextResponse.json({ message: 'Region name is required' }, { status: 400 });
    }

    // Check if the region already exists
    const existingRegion = await Region.findOne({ regionName });
    if (existingRegion) {
      return NextResponse.json({ message: 'Region already exists' }, { status: 409 });
    }

    // Create a new region
    const newRegion = new Region({ regionName });
    await newRegion.save();

    return NextResponse.json({ message: 'Region added successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create region', error: error.message }, { status: 500 });
  }
}
