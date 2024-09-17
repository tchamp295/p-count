import { connectMongoDB } from '@/lib/mongoose';
import { Ip } from "@/models/ip";
import { Region } from '@/models/region';
import { Sfp } from "@/models/sfp";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongoDB(); // Connect to the MongoDB database

  try {
    // Get data from the request body
    const { sfpName, sfpEmail, sfpTelephone, gender, ip, region } = await req.json();

    // Check if IP exists
    const existingIp = await Ip.findById(ip);
    if (!existingIp) {
      return NextResponse.json({ error: "IP not found" }, { status: 404 });
    }

    // Check if Region exists
    const existingRegion = await Region.findById(region);
    if (!existingRegion) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 });
    }

    // Create new SFP document
    const newSfp = new Sfp({
      sfpName,
      sfpEmail,
      sfpTelephone,
      gender,
      ip,     // Assign selected IP
      region, // Assign selected Region
    });

    const savedSfp = await newSfp.save(); // Save the new SFP to MongoDB

    // Check if existingRegion has the sfps array
    if (!existingRegion.sfps) {
      return NextResponse.json({ error: "Region does not have sfps field" }, { status: 500 });
    }

    // Update the Region to include this new SFP
    existingRegion.sfps.push(savedSfp._id);
    await existingRegion.save();

    // Return the created SFP record
    return NextResponse.json(
      { message: "SFP created successfully", sfp: savedSfp },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating SFP:", error.message); // Log the error
    return NextResponse.json(
      { error: "Error creating SFP record", message: error.message },
      { status: 500 }
    );
  }
}
