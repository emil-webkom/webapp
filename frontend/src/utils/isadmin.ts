// import { db } from "@/lib/db";

// export const isAdmin = async (email: string): Promise<boolean> => {
//     try {
//         const user = await db.user.findUnique({ where: { email: email } });
        
//         if (user?.role === 'ADMIN') {
//             return true;
//         }
        
//         return false;
//     } catch (error) {
//         console.error("Could not find user:", error);
//         return false; 
//     }
// };
