export async function testDeleteKomite(komite: string) {
  try {
    const endpoint = `api/komite/komite?komite=${encodeURIComponent(komite)}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
      // Can add headers for e.g. verification
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete komite with name: ${komite}: ${response.statusText}`,
      );
    }
    console.log("Komite successfully deleted");
  } catch (error) {
    throw error;
  }
}
