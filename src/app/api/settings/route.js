import { NextResponse } from "next/server";
import { Settings } from "@/models/settings";
import { connectMongoDB } from "@/lib/mongoose";

// GET Method: Fetch the single settings document
export async function GET() {
  try {
    await connectMongoDB(); // Ensure DB connection
    const settings = await Settings.findOne(); // Find the single settings document

    if (!settings) {
      return NextResponse.json({ message: "No settings found" }, { status: 404 });
    }

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching settings", error: error.message },
      { status: 500 }
    );
  }
}

// PUT Method: Update the single settings document (or create if it doesn't exist)
export async function PUT(req) {
  try {
    const body = await req.json();

    const {
      appName,
      appEmail,
      appUrl,
      alertExpiry,
      smsSenderId,
      smsGatewayUrl,
      smsApiKey,
    } = body;

    await connectMongoDB();

    // Update the single settings document, or create it if it doesn't exist
    const updatedSettings = await Settings.findOneAndUpdate(
      {}, // No filter, this will update the first and only settings document
      {
        appName,
        appEmail,
        appUrl,
        alertExpiry,
        smsSenderId,
        smsGatewayUrl,
        smsApiKey,
      },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

    return NextResponse.json({
      message: "Settings updated successfully!",
      settings: updatedSettings,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update settings", error: error.message },
      { status: 500 }
    );
  }
}
