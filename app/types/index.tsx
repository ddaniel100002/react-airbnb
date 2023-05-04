import { Listing, User } from "@prisma/client"

//Datetime is considered dangerous for some reason... so we modify it!
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string | undefined;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
}