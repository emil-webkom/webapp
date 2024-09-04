export async function testPostAeresemiler(data: { aar: number; type: string; navn: string }) {
    try {
      const endpoint = `/api/aeresemiler`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(
          `Failed to create aeresemiler: ${response.statusText}`,
        );
      }
      console.log("AeresEmiler successfully created");
    } catch (error) {
      throw error;
    }
  }