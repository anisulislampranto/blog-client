'use client';

import { useEffect } from "react";

export default function AboutError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {

    useEffect(() => {
        console.error(error)
    }, [error])


    return (
        <div>About Error: Something went wrong!
            <button onClick={() => reset}>Retry</button>
        </div>
    )
}
