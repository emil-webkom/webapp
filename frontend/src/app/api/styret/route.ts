import { NextRequest, NextResponse } from "next/server";
import { FetchStyret } from "@/utils/styret/fetchers";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const data = await FetchStyret();

    if (!data) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching komite-data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// Function for updating existing entries in table hovedstyret in DB.
export async function PATCH(request: NextRequest) {
  /* Takes JSON objects in the form:
    {
        rolle : "existingRolle",
        text : "newtext",
        userID : "existingUserID",
        image : "newbildelink",
        active : true/false
    }
    and rolle and userEmail through URL: /api/styret/[rolle]&[user]
    */

  const url = new URL(request.url);
  const rolle = url.searchParams.get("rolle");
  const userEmail = url.searchParams.get("userID")!;
  const body = await request.json();
  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return NextResponse.json({ error: "Could not find User" }, { status: 400 });
  }

  if (!rolle || !user.id) {
    return NextResponse.json(
      { error: "Rolle and userID are required" },
      { status: 400 },
    );
  }
  try {
    // Check if the 'rolle' and 'userID' combination exists in the database
    const existingRolle = await db.hovedstyret.findUnique({
      where: {
        id: {
          rolle: rolle,
          userID: user.id,
        },
      },
    });

    if (!existingRolle) {
      return NextResponse.json(
        { error: "Rolle and userID combination not found" },
        { status: 404 },
      );
    }
    const updatedRolle = await db.hovedstyret.update({
      where: {
        id: {
          rolle: rolle,
          userID: user.id,
        },
      },
      data: {
        rolle: body.rolle,
        text: body.text,
        image: body.image,
        isActive: body.active,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Rolle successfully updated", rolle: updatedRolle },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating rolle in database:", error);
    return NextResponse.json(
      { message: "Internal server error. Could not update rolle." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const rolle = url.searchParams.get("rolle");
  if (!rolle) {
    return NextResponse.json(
      { error: "Rolle name is required" },
      { status: 400 },
    );
  }
  try {
    await db.hovedstyret.delete({
      where: { rolle: rolle },
    });
    return NextResponse.json(
      { message: "Rolle successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting rolle from database:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
