import { TableBody } from "@/components/ui/table";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function PATCH(
  req: NextRequest,
  { params }: { params: { rolle: string } }
) {
  try {
    const updateData = await req.json();
    const user = await getUserByEmail(updateData.email);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
    )}

    await db.hovedstyret.update({
      where: {
        id: {
          rolle: updateData.rolle,
          userID: updateData.userID,
        },
      },
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
      { message: "Hovedstyret updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating hovedstyret:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest,
  { params }: { params: { rolle: string } },
) {
  try {
    const rolleToChange = await req.json();

    await db.hovedstyret.delete({
      where: {
        id:{
          rolle: rolleToChange.rolle,
          userID: rolleToChange.userID,
        }},
    });
    return NextResponse.json(
      { message: "Successfully deleted hovedstyret" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}