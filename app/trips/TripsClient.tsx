'use client';

import { useRouter } from "next/navigation";
import Container from "../components/shared/Container";
import Heading from "../components/shared/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router])

    return (
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going..." />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((res) => (
                    <ListingCard key={res.id} data={res.listing} reservation={res} actionId={res.id} onAction={onCancel} disabled={deletingId === res.id} actionLabel="Cancel reservation" currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    );
};

export default TripsClient;