import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongoose';
import { AdvisoryCategory } from '@/models/advisoryCategory';

export async function GET() {
  await connectMongoDB(); 

  try {
 
    const categories = await AdvisoryCategory.find();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch advisory categories', error: error.message }, { status: 500 });
  }
}



export async function DELETE(req) {
    await connectMongoDB(); // Ensure MongoDB connection is established
  
    try {
      // Get the category ID from the query string
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
      }
  
      // Find and delete the category by ID
      const deletedCategory = await AdvisoryCategory.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return NextResponse.json({ message: 'Category not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Advisory Category deleted successfully!' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to delete Advisory Category', error: error.message }, { status: 500 });
    }
  }