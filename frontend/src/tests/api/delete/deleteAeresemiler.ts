export async function testDeleteAeresemiler(id: string) {
    try {
      const endpoint = `/api/aeresemiler/${id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
        // Can add headers for e.g. verification
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete aeresemiler: ${id}: ${response.statusText}`,
        );
      }
      console.log("AeresEmiler successfully deleted");
    } catch (error) {
      throw error;
    }
  }