import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await req.json();

    await db.user.update({
      where: { id: params.id },
      data: updateData, 
    });

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log("Dowegethere")
  try {
    await db.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      { message: "Successfully deleted user" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}