'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../shared/HeartButton";
import Button from "../shared/Button";


interface ListingCardProps {
    // data: Listing
    data: SafeListing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

//This is a reusable component, found in:
const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    //we do this so that onAction will work properly
    actionId = "",
    actionLabel,
    currentUser
}) => {

    const router = useRouter();
    const { getOneByVal } = useCountries();

    //getting locationValue of the house - a prop from the database.
    const location = getOneByVal(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        //could be undefined
        onAction?.(actionId);
        
    },[actionId, disabled, onAction]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    },[data.price, reservation]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        //INSTALL PACKAGE FIRST npm i date-fns
        return `${format(start,'PP')} - ${format(end,'PP')}`;
    },[reservation])

    return (
        <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listings/${data.id}`)}>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image fill alt="Listing" src={data.imageSrc} className="object-cover h-full w-full group-hover:scale-110 transition"/>
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser}/>
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">For a night</div>
                    )} 
                </div>
                {onAction && actionLabel && (
                    <Button disabled={disabled} small label={actionLabel} onClick={handleCancel}/>
                )}
            </div>
        </div>
    )
}
export default ListingCard;