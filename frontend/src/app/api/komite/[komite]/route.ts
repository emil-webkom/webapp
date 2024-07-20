import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";


export async function DELETE (request: NextRequest){
    const url = new URL(request.url);
    const komite = url.searchParams.get('komite');

    if (!komite){
        return NextResponse.json({error: "Komite name is required"},{status:400});
    }
    try{
        await db.komite.delete({
            where: {navn: komite},
        });
        return NextResponse.json({message: "Komite successfully deleted"}, {status: 200});
    }
    catch(error){
        console.error("Error deleting komite from database:", error);
        return NextResponse.json(
            {message: "Internal server error"},
            {status : 500}
        );
    }
}
