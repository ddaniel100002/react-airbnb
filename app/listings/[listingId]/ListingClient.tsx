'use client';

import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/shared/Container";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { list } from "postcss";
import { useMemo } from "react";



interface ListingClientProps {
    reservations?: Reservation[];
    //please remember that the listing has the user inside of it.
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
}


const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations
}) => {

    const category = useMemo(() => {
        return categories.find((c) => c.label === listing.category)
    },[listing.category])

  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser}/>
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} guestCount={listing.guestCount}/>
                </div>
            </div>
        </div>
    </Container>
  )
}
export default ListingClient;