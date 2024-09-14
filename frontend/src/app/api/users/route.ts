import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const hovedstyret = await db.user.findMany();

    if (!hovedstyret || hovedstyret.length === 0) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
    return NextResponse.json({ data: hovedstyret }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
