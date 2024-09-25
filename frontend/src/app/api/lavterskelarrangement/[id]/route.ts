import { db } from "@/lib/db";
import { lavTerskelArrangementSchema } from "@/schemas/lavterskelArrangement";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

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

  export async function PATCH(req: NextRequest) {
    try {
      const requestData = await req.json();

      if (requestData.dato) {
        requestData.dato = new Date(requestData.dato);
      }

      const parsedData = lavTerskelArrangementSchema.parse(requestData);
      const lavterskelArrangement = await db.lavterskelArrangement.update({
        where: {id: parsedData.id},
        data: parsedData,
      });

      return NextResponse.json({
        success: true,
        message: "Lavterskelarrangement upated",
        data: lavterskelArrangement,
      });
    } catch (error) {
      console.log("Error in the PATCH request");
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }