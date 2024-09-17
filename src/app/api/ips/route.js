import { connectMongoDB } from "@/lib/mongoose";
import { Ip } from "@/models/ip";
import { Region } from "@/models/region";
import { NextResponse } from "next/server";

// GET: Fetch all IP records or the total count
export async function GET(req) {
  await connectMongoDB(); // Connect to the database

  const url = new URL(req.url, `http://${req.headers.host}`);
  const type = url.searchParams.get("type"); // Determine the request type

  try {
    if (type === "count") {
      // Fetch the total number of IP records
      const count = await Ip.countDocuments();
      return NextResponse.json({ count }, { status: 200 });
    } else {
      // Fetch all IP records
      const ips = await Ip.find();
      return NextResponse.json(ips, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching IP records", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Find and delete the IP record
    const ip = await Ip.findByIdAndDelete(id);

    if (!ip) {
      return NextResponse.json({ message: "IP not found." }, { status: 404 });
    }

    // Detach IP from regions
    await Region.updateMany(
      { ips: id }, // Use the correct field name
      { $pull: { ips: id } } // Remove IP ID from the array
    );

    return NextResponse.json(
      { message: "IP deleted and detached from regions successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to delete IP.", error: err.message },
      { status: 500 }
    );
  }
}
