import { connectMongoDB } from '@/lib/mongoose';
import { Ip } from '@/models/ip';
import { Region } from '@/models/region'; // Import the Region model
import { NextResponse } from 'next/server';

// POST: Create a new IP record and assign it to a region
export async function POST(req) {
  await connectMongoDB(); // Connect to the database

  try {
    const {
      ipName,
      ipTelephone,
      ipEmailAddress,
      ipPostalAddress,
      ipPhysicalLocation,
      ipContactPerson,
      ipContactTelephone,
      ipContactEmail,
      regionId, // The region ID to assign the IP to
    } = await req.json();

    // Check if the region exists
    const existingRegion = await Region.findById(regionId);
    if (!existingRegion) {
      return NextResponse.json(
        { error: 'Region not found' },
        { status: 404 }
      );
    }

    // Create new IP document
    const newIp = new Ip({
      ipName,
      ipTelephone,
      ipEmailAddress,
      ipPostalAddress,
      ipPhysicalLocation,
      ipContactPerson,
      ipContactTelephone,
      ipContactEmail,
      region: regionId, // Reference to the region
    });

    const savedIp = await newIp.save(); // Save the new IP to MongoDB

    // Update the corresponding region to include this IP
    existingRegion.ips.push(savedIp._id);
    await existingRegion.save();

    // Return the created IP record and confirmation of assignment
    return NextResponse.json(
      { message: "IP created and assigned to region successfully", ip: savedIp },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);  // Log the full error to see what went wrong
    return NextResponse.json(
      { error: 'Error creating IP record', message: error.message },
      { status: 500 }
    );
  }
}
