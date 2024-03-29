'use client';

import { useEffect } from "react";
import EmptyState from "./components/shared/EmptyState";

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error)
    },[error])

    return (
        <EmptyState title="Uh On" subtitle="Something went wrong!"/>
    )
};

export default ErrorState;