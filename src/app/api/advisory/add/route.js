import { connectMongoDB } from '@/lib/mongoose';
import { Advisory } from '@/models/advisory';
import { AdvisoryCategory } from '@/models/advisoryCategory';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectMongoDB();

  try {
    const { description, categoryId } = await req.json();

    // Log the categoryId to see if it's being received correctly
    console.log("categoryId:", categoryId);

    // Find the category by ID to ensure it exists
    const advisoryCategory = await AdvisoryCategory.findById(categoryId);
    if (!advisoryCategory) {
      return NextResponse.json({ message: 'Invalid Advisory Category' }, { status: 400 });
    }

    // Create a new Advisory
    const newAdvisory = new Advisory({
      description,
      advisoryCategory: categoryId, // Set the category reference
    });

    await newAdvisory.save();

    return NextResponse.json({ message: 'Advisory added successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error adding advisory:", error); // Log the error for debugging
    return NextResponse.json({ message: 'Failed to add advisory', error: error.message }, { status: 500 });
  }
}
