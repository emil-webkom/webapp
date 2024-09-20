import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;

export async function DELETE(req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await db.komite.delete({
      where: { id: params.id }
    });

    return NextResponse.json({message: "Successfully deleted komite:"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
  const komiteId = params.id
  if (!komiteId) {
    return NextResponse.json(
      { error: "Komite ID is required" },
      { status: 400 }
    );
  }

  try {
    const komite = await db.komite.findUnique({
      where: { id: komiteId },
    });
    if (!komite) {
      return NextResponse.json(
        { error: "Komite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(komite, { status: 200 });
  } catch (error) {
    console.error("Error fetching komite from database:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params.id);
    const body = await req.json();

    // Ensure the required fields are included and properly structured
    const komiteData = {
      navn: body.navn,
      leder: body.leder ?? null,
      text1: body.text1 ?? null,
      text2: body.text2 ?? null,
      text3: body.text3 ?? null,
      bilde: body.bilde,
      mail: body.mail ?? null,
      mappe: body.mappe ?? null,
    };

    // Create a new komite entry in the database
    const komite = await db.komite.update({
      where: {id: params.id},
      data: komiteData,
    });

    return NextResponse.json(
      {
        message: "Komite updated successfully",
        data: komite,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating komite", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}