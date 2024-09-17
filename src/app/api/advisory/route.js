import { connectMongoDB } from "@/lib/mongoose";
import { Advisory } from "@/models/advisory";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();

  try {
    // Fetch all advisories from the database
    const advisories = await Advisory.find().populate(
      "advisoryCategory",
      "categoryName"
    );
    // console.log("Advisories:", advisories); // Check what's returned here

    return NextResponse.json({ advisories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch advisories", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const advisoryId = url.searchParams.get("id");
    console.log(advisoryId);

    if (!advisoryId) {
      return NextResponse.json(
        { message: "Advisory ID is required" },
        { status: 400 }
      );
    }

    const result = await Advisory.findByIdAndDelete(advisoryId);

    if (!result) {
      return NextResponse.json(
        { message: "Advisory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Advisory deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete advisory", error: error.message },
      { status: 500 }
    );
  }
}
