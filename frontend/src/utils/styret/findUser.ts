import { db } from "@/lib/db"

export const findUser = async (emailToCheck :string) => {
    try {
        const user = await db.user.findUnique({ where: { email: emailToCheck } });
    } catch (error) {
        // Handle error
    }
}
