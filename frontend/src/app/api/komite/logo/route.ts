import fetchKomite from "@/utils/komite/fetchers";

export async function GET () {
    const data = await fetchKomite();
    return Response.json(data);
}