import { db } from "@/lib/db";
import { SamarbeidspartnerSchema } from "@/schemas/samarbeidspartner";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

 /**
 * Deletes a given instance in AeresEmiler table
 * @param id: string
 * @returns Response indicating if the deletion was successfull.
 */
export async function DELETE(req: NextRequest,
    { params }: { params: { id: string } },
  ) {
    try {
      await db.samarbeidspartner.delete({
        where: { id: params.id },
      });
      return NextResponse.json(
        { message: "Successfully deleted samarbeidspartner" },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }
  }
  
//  /**
//  * Updates a given instance in samarbeidspartner table
//  * @param id: string
//  * @param data: {FILL IN LATER}
//  * @returns Response indicating if the update was successfull.
//  */

export async function PATCH(req: NextRequest,
  { params }: { params: { id: string } },
) {
  const updateData = await req.json();
  const parsedData = SamarbeidspartnerSchema.parse(updateData);
  try {
    await db.samarbeidspartner.update({
      where: { id: params.id },
      data: parsedData
    });
    return NextResponse.json(
      { message: "Successfully updated hovedsamarbeidspartner" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}