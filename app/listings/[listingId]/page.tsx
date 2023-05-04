import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/shared/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
    listingId?: string;
}

//THIS IS A SERVER COMPONENT. we are not using any react hooks, so we change things up a bit.
const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();



    return (
        // <div>
        //     {listing.title}
        // </div>
        <div>
            {!listing ?
                <EmptyState />
                :
                <div>
                    <ListingClient listing={listing} currentUser={currentUser}/>
                </div>
            }
        </div>
    )
}
export default ListingPage;