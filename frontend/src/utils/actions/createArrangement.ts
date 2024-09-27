// "use server";

// import { db } from "@/lib/db";
// import { createArrangementSchema } from "@/schemas/arrangement";
// import { z } from "zod";

// export const createArrangement = async (
//   values: z.infer<typeof createArrangementSchema>
// ) => {
//   try {
//     const validatedData = createArrangementSchema.parse(values);

//     if (!validatedData)
//       return new Error("I dont know what the fuck is happening");

//     await db.arrangement.create({
//       data: validatedData,
//       create: {

//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
