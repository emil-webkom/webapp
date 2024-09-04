import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,
    { params }: { params: { id: string } },
  ) {
    try {
      await db.lavterskelArrangement.delete({
        where: { id: params.id },
      });
      return NextResponse.json(
        { message: "Successfully deleted lavterskelarrangement" },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }
  }
  