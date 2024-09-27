import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const paameldinger = await db.arrangementPaamelding.findMany({
      where: {
        arrangementID: params.id,
      },
    });

    if (!paameldinger || paameldinger.length === 0) {
      return NextResponse.json(
        { error: "Ingen paameldinger funnet" },
        { status: 404 },
      );
    }
    const userPromises = paameldinger.map((p) => getUserById(p.userID));
    const users = await Promise.all(userPromises);

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "En feil oppstod ved henting av brukere" },
      { status: 500 },
    );
  }
}
