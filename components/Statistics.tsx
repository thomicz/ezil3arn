"use client";

import { useEffect, useState } from "react";

export default function Statistics() {
    const [usersCount, setUsersCount] = useState<number | null>(null);
    const [reviewsCount, setReviewsCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [resUsers, resReviews] = await Promise.all([
                    fetch("/api/statistics/usersCount", { cache: "no-store" }),
                    fetch("/api/statistics/usersReviews", { cache: "no-store" }),
                ]);

                if (!resUsers.ok) throw new Error("usersCount failed: " + resUsers.status);
                if (!resReviews.ok) throw new Error("usersReviews failed: " + resReviews.status);

                const usersData: { count: number } = await resUsers.json();
                const reviewsData: { count: number } = await resReviews.json();

                setUsersCount(usersData.count);
                setReviewsCount(reviewsData.count);
            } catch (e) {
                setError("Nepodařilo se načíst statistiky.");
            }
        };

        load();
    }, []);

    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (usersCount === null || reviewsCount === null) return <div className="p-4">Načítám...</div>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border bg-white/60 p-4 text-center shadow-sm">
                <p className="text-sm text-gray-500">Už nás je</p>
                <p className="text-3xl font-extrabold">{usersCount}</p>
            </div>

            <div className="rounded-xl border bg-white/60 p-4 text-center shadow-sm">
                <p className="text-sm text-gray-500">Počet recenzí</p>
                <p className="text-3xl font-extrabold">{reviewsCount}</p>
            </div>
        </div>
    );

}
