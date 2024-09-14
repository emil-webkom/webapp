import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function GET(request: NextRequest) {
  try {
    const hovedstyret = await db.hovedstyret.findMany({
      include: {
        User: true,
      },
    });

    if (!hovedstyret || hovedstyret.length === 0) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
    return NextResponse.json({ data: hovedstyret }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hovedstyret data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const updateData = await req.json();
    const user = await getUserByEmail(updateData.email);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
    )}

    await db.hovedstyret.create({
      data: {
        rolle: updateData.rolle,
        text: updateData.text,
        image: updateData.image,
        updatedAt: updateData.updatedAt,
        userID: user.id,
        isActive: updateData.isActive,
      },
    });

    return NextResponse.json(
      { message: "New member successfully created" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating new member in hovedstyret:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
