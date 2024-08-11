import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  updateArrangementSchema,
  deleteArrangementSchema,
} from "@/schemas/arrangement";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const arrangement = await db.arrangement.findUnique({
      include: {
        arrangor: true,
        paameldinger: true,
      },
      where: { id: params.id },
    });
    if (!arrangement) {
      return NextResponse.json(
        { error: "Arrangement not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(arrangement, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const parsedData = updateArrangementSchema.parse(await req.json());
//     const arrangement = await db.arrangement.update({
//       where: { id: params.id },
//       data: parsedData,
//     });
//     return NextResponse.json(
//       { message: "Arrangement updated", arrangement },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const parsedData = deleteArrangementSchema.parse({ id: params.id });
    await db.booking.delete({
      where: { id: parsedData.id },
    });
    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
