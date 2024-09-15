import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongoose';
import { AdvisoryCategory } from '@/models/advisoryCategory';

export async function POST(req) {
  await connectMongoDB(); // Ensure the MongoDB connection is established

  try {
    const { categoryName, desc } = await req.json(); // Destructure desc properly

    if (!categoryName) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }

    // Check if the advisory category already exists
    const existingCategory = await AdvisoryCategory.findOne({ categoryName });
    if (existingCategory) {
      return NextResponse.json({ message: 'Advisory Category already exists' }, { status: 409 });
    }

    // Create a new advisory category
    const newCategory = new AdvisoryCategory({ categoryName, desc });
    await newCategory.save();

    return NextResponse.json({ message: 'Advisory Category added successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create Advisory Category', error: error.message }, { status: 500 });
  }
}
