import prisma from '../libs/prismadb'

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string
}

export default async function getListings(
    params: IListingsParams,

) {
    try {
        const { userId, roomCount, guestCount, bathroomCount, startDate, endDate, locationValue, category } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                //the plus sign transform the number into a definite number
                gte: +roomCount
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            };
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }


        //if there is a single day in the reservation date range, we are going to filter out that listing.
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        //Because we are using this hook in a client component, we again have the problem with the date. After doing this, we are a doing a special type in the types folder, put that in the page.tsx, and listing-card there.
        const safeListings = listings.map((listing) => ({
            ...listing, createdAt: listing.createdAt.toISOString()
        }))

        return safeListings;

    } catch (err: any) {
        throw new Error(err);
    }
}