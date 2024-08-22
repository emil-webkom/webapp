export async function testEditHSRolle(rolle: string, userID: string) {
  const body = {
    rolle: "Kongsknekt",
    text: "Kongsknekten er linjeforeningens øverste leder og har kontroll på aktiviteten i EMIL i tillegg til å opprettholde godt samarbeid internt og eksternt",
    userID: "mauritzs@stud.ntnu.no",
    image:
      "https://firebasestorage.googleapis.com/v0/b/emilweb-3181b.appspot.com/o/images%2FHS%2Fleder.jpg?alt=media&token=eeb2b36a-1e27-4e07-97f3-3eefdf50d0f9",
    IsActive: true,
  };

  try {
    const endpoint = `/api/styret?rolle=${encodeURIComponent(rolle)}&userID=${encodeURIComponent(userID)}`;
    const response = await fetch(endpoint, {
      method: "PATCH",
      // Can add headers for e.g. verification
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to modify rolle with name: ${rolle} and userID: ${userID}: ${response.statusText}`,
      );
    }
    console.log("Rolle successfully modified");
  } catch (error) {
    console.error("Error modifying rolle:", error);
    throw error;
  }
}
