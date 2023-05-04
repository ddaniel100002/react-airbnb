import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import Container from "./components/shared/Container";
import EmptyState from "./components/shared/EmptyState";
import { SafeListing } from "./types";

export default async function Home() {

  const listings = await getListings();
  const currentUser = await getCurrentUser();
  //const isEmpty = true;

  return (
    <div>
      {listings.length < 1 ?
        <EmptyState showReset/>
        :
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
            ))}
          </div>
        </Container>}
    </div>
  )
}
