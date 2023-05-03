import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({listingId,currentUser}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        //returns true of false if the user has favorited it already.
        return list.includes(listingId);
    },[currentUser, listingId])

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let req;

            if (hasFavorited) {
                req = () => axios.delete(`/api/favorites/${listingId}`);
            }
            else {
                req = () => axios.post(`/api/favorites/${listingId}`);
            }

            await req();
            router.refresh();
            toast.success('Success!');
        } catch (err: any) {
            toast.error(err.message)
        }
    },[currentUser, hasFavorited, listingId, loginModal, router]);

    return {hasFavorited, toggleFavorite}
};

export default useFavorite;