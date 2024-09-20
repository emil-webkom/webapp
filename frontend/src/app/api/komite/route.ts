import fetchKomite from "@/utils/komite/fetchers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;

export async function GET(request: NextRequest){
    try {
        const data = await fetchKomite();
    
        if (!data) {
          return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        console.error("Error fetching komite-data:", error);
        return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 },
        );
      }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
    const komite = await db.komite.create({
      data: komiteData,
    });

    return NextResponse.json(
      {
        message: "Komite created successfully",
        data: komite,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating new komite", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
