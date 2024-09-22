import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany();

    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
    return NextResponse.json({ status: 200, data: users });
  } catch (error) {
    console.error("Error fetching users data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
