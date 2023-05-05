import EmptyState from "../components/shared/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="UnAuthorized" subtitle="Please login"/>
    }

    // All the reservations that all the people made in our estates...
    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if (reservations.length === 0) {
        return <EmptyState title="No Reservations found" subtitle="Looks like you have no reservations on your property"/>
    }

    return (
        <ReservationsClient reservations={reservations} currentUser={currentUser}/>
    )
};

export default ReservationsPage;