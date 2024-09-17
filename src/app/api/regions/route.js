import { connectMongoDB } from "@/lib/mongoose";
import { Region } from "@/models/region";
import { Sfp } from "@/models/sfp"; // Import Sfp model
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB(); // Connect to the database

  try {
    // Fetch regions with the count of associated IPs and SFPs
    const regions = await Region.aggregate([
      {
        $lookup: {
          from: "ips", // The collection name for IPs
          localField: "ips",
          foreignField: "_id",
          as: "ipDetails",
        },
      },
      {
        $lookup: {
          from: "sfps", // The collection name for SFPs
          localField: "sfps",
          foreignField: "_id",
          as: "sfpDetails",
        },
      },
      {
        $addFields: {
          totalIps: { $size: "$ipDetails" }, // Add a field for the total number of IPs
          totalSfps: { $size: "$sfpDetails" }, // Add a field for the total number of SFPs
        },
      },
      {
        $project: {
          regionName: 1,
          totalIps: 1,
          totalSfps: 1,
        },
      },
    ]);

    return NextResponse.json(regions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching regions', message: error.message },
      { status: 500 }
    );
  }
}
