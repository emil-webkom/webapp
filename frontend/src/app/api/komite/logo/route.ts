import { NextResponse, NextRequest } from "next/server";
import fetchKomite from "@/utils/komite/fetchers";

export async function GET(request: NextRequest) {
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
