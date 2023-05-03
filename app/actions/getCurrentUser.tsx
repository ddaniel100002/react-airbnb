import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '../libs/prismadb';

export async function getSession() {
    return await getServerSession(authOptions);
}

//We purposely don't throw any errors becuase we don't want everything to break... 
export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if(!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        //we do this, because the transfter of datetime objects to client components cause hydration. MAKE SURE TO FIX THE ERROR IN THE LAYOUT.
        return {
            ...currentUser,
            createdAt: currentUser.createdAt?.toISOString(),
            updatedAt: currentUser.updatedAt?.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    } catch (err: any) {
        return null;
    }
}