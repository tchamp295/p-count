import { auth } from "@/lib/auth"; // Ensure you import the auth function
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongoose";
import Contact from "@/models/contact";

// Validate input data
function validateContactData(names, status, regions, telephone) {
  if (!names || !status || !regions || !telephone) {
    return { isValid: false, message: "All fields are required" };
  }

  const nameArray = names.split(",").map((name) => name.trim());
  const telephoneArray = telephone.split(",").map((phone) => phone.trim());

  if (nameArray.length !== telephoneArray.length) {
    return {
      isValid: false,
      message: "Mismatched names and telephone numbers",
    };
  }

  return { isValid: true, nameArray, telephoneArray };
}

// Use auth middleware to protect the POST method
export const POST = auth(async (req) => {
  await connectMongoDB();

  // req.auth should contain user info if authenticated
  const user = req.auth;

  if (!user) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { names, status, regions, telephone } = await req.json();

    // Validate input
    const validation = validateContactData(names, status, regions, telephone);
    if (!validation.isValid) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }

    const { nameArray, telephoneArray } = validation;

    // Create an array of contact objects for bulk insert
    const contactsToInsert = nameArray.map((name, index) => ({
      names: name,
      status,
      regions,
      telephone: telephoneArray[index],
    }));

    // Insert all contacts in one go using insertMany
    const savedContacts = await Contact.insertMany(contactsToInsert);

    return NextResponse.json(
      {
        message: "Contacts added successfully!",
        contacts: savedContacts,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add contacts", error: error.message },
      { status: 500 }
    );
  }
});
