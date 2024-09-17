import { NextResponse } from 'next/server'; // Import NextResponse for Next.js API routes
import { connectMongoDB } from '@/lib/mongoose';
import { Alert } from '@/models/alert';
import { Ip } from '@/models/ip';
import { Region } from '@/models/region';

export async function POST(req) {
  await connectMongoDB();

  try {
    const { description, category, notificationMethods, ips, regions } = await req.json();

    // Log incoming data for debugging
    console.log('Received Data:', { description, category, notificationMethods, ips, regions });

    // Validate input data
    if (!description || !category || !notificationMethods || (!ips.length && !regions.length)) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Ensure no null IPs or Regions are sent
    const validIps = ips.filter(ip => ip !== null);
    const validRegions = regions.filter(region => region !== null);

    // Fetch valid IPs and Regions from the database
    const foundIps = validIps.length ? await Ip.find({ _id: { $in: validIps } }) : [];
    const foundRegions = validRegions.length ? await Region.find({ _id: { $in: validRegions } }) : [];

    if (!foundIps.length && !foundRegions.length) {
      return NextResponse.json({ error: 'Invalid IP or Region selection' }, { status: 400 });
    }

    // Create new alert
    const newAlert = new Alert({
        description,
        category,
        notificationMethods: {
          isSms: notificationMethods.sms,
          isHttpPush: notificationMethods.httpPush,
          isEmail: notificationMethods.email,
        },
        ipIds: foundIps.map(ip => ip._id),
        regionIds: foundRegions.map(region => region._id),
      });
      

    await newAlert.save();

    return NextResponse.json({ message: 'Alert created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error, please try again' }, { status: 500 });
  }
}
