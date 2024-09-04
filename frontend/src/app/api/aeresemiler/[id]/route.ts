import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

 /**
 * Deletes a given instance in AeresEmiler table
 * @param id: string
 * @returns Response indicating if the deletion was successfull.
 */
export async function DELETE(req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await db.aeresEmiler.delete({
      where: { id: params.id }
    });

    return NextResponse.json({message: "Successfully deleted instance:"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}