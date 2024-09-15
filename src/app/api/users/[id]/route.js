import { connectMongoDB } from '@/lib/mongoose';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';


export async function PUT(request) {
  await connectMongoDB();

  try {
    const { pathname } = new URL(request.url); // Get the URL from the request
    const id = pathname.split('/').pop(); // Extract ID from URL path

    const data = await request.json(); // Parse the JSON body

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Ensure the data includes valid fields
    if (!data.name || !data.email) {
      return NextResponse.json({ message: 'Required fields are missing' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error); // Log the error
    return NextResponse.json({ message: 'Failed to update user', error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  await connectMongoDB();

  try {
    const { pathname } = new URL(request.url); // Get the URL from the request
    const id = pathname.split('/').pop(); // Extract ID from URL path

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch user', error: error.message }, { status: 500 });
  }
}
