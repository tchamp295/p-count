import { connectMongoDB } from "@/lib/mongoose";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export  async function GET() {
 await connectMongoDB();
 return Response.json(await User.find())
}
export async function DELETE(req) {
    // const { query } = parse(req.url, true);
    // const id = query.id;
    // console.log(id);
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
  
    console.log(id);
    try {
      // Assuming this is a MongoDB connection setup
     connectMongoDB();
  
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return NextResponse.json({ message: "ser not found." }, { status: 404 });
      }
  
      return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to delete user." },
        { status: 500 }
      );
    }
  }
  