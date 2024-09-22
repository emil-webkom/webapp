import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

 /**
 * @param id: string
 * @returns Response indicating if the deletion was successfull.
 */
export async function PATCH(req: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await req.json()
  try {
    await db.kontigentpris.update({
      where: { id: params.id },
      data: { pris: data.pris }
    });

    return NextResponse.json({message: "Successfully updated instance:"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}