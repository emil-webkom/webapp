import { NextResponse, NextRequest } from "next/server";
import fetchKomite from "@/utils/komite/fetchers";
import { db } from "@/lib/db";

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

// export async function DELETE (request: NextRequest){

//     const {searchParams} = new URL(request.url);
//     const komite = searchParams.get("komite");
//     console.log(komite);

//     if (!komite){
//         return NextResponse.json({error: "Komite name is required"},{status:400});
//     }
//     try{
//         await db.komite.delete({
//             where: {navn: komite},
//         });
//         return NextResponse.json({message: "Komite successfully deleted"}, {status: 200});
//     }
//     catch(error){
//         console.error("Error deleting komite from database:", error);
//         return NextResponse.json(
//             {message: "Internal server error"},
//             {status : 500}
//         );
//     }
// }