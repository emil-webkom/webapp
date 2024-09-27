import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const arrangementPaameldinger = await db.arrangementPaamelding.findMany({
      where: {
        arrangementID: params.id,
      },
    });

    return NextResponse.json(
      { data: arrangementPaameldinger },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id: eventId } = params;
    const { userId } = await req.json();

    if (!userId || !eventId) {
      return NextResponse.json(
        { error: "Missing eventId or userId" },
        { status: 400 },
      );
    }

    const deletedSignup = await db.arrangementPaamelding.delete({
      where: {
        userID_arrangementID: {
          userID: userId,
          arrangementID: eventId,
        },
      },
    });

    if (!deletedSignup) {
      return NextResponse.json({ error: "Signup not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Signup deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting signup:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the signup" },
      { status: 500 },
    );
  }
}
