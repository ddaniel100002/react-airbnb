import prisma from '../libs/prismadb'

export default async function getListings(){
    try {
        const listings = await prisma.listing.findMany({
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