import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const aeresemilere = await db.aeresEmiler.findMany();
    return NextResponse.json(aeresemilere, { status: 200 });
  } catch (error) {
    console.error("Error fetching aeresEmilere:", error);
    return NextResponse.json(
      { error: "Failed to fetch aeresEmilere" },
      { status: 500 }
    );
  }
}

// Takes a json body-object on the format {id: String}
export async function DELETE(request: NextRequest) {
  const body = await request.json(); 
  const deleteId = body.id; 

  if (!deleteId) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
      const aeresemilere = await db.aeresEmiler.delete({
          where: { id: deleteId }
      });
      return NextResponse.json(
        {
          message: "Deleted aeresEmilere",
          aeresemilere: [aeresemilere]
        },
        { status: 200 },
      );
    } catch (error) {
      console.log("Error deleting aeresEmilere", error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
}
