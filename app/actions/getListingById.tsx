import prisma from '../libs/prismadb';

interface IParams {
    listingId?: string;
}

export async function getListingById(params: IParams) {
    try {
        const { listingId } = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            //we are using also some user information, so we include the user when sending back a response.
            include: {
                user: true
            }
        });

        if (!listing) {
            return null
        }

        const safeListingAndUser = {
            ...listing, createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user, createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }

        return safeListingAndUser;
    } catch (err: any) {
        throw new Error(err);
    }
}