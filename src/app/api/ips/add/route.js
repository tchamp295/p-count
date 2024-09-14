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
      regionId, // Add regionId in the request body
    } = await req.json();

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
    });

    const savedIp = await newIp.save(); // Save the new IP to MongoDB

    // Update the corresponding region to include this IP
    await Region.findByIdAndUpdate(regionId, {
      $push: { ips: savedIp._id }, // Add the new IP's ID to the region's ips array
    });

    // Return the created IP record and confirmation of assignment
    return NextResponse.json({ message: "IP created and assigned to region successfully", ip: savedIp }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating IP record', message: error.message }, { status: 500 });
  }
}
