import fetchStyret from "@/utils/styret/fetchers"

export async function GET() {
    const data = await fetchStyret();
    return Response.json(data)
}