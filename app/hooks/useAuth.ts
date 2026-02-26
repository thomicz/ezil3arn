"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            //Fetchuje /api/me, aby zjistil, zda je uživatel přihlášen
            try {
                const res = await fetch("../api/auth/me", {
                    credentials: "include"
                });

                //Data, které jsme získali
                const data = await res.json();
                //console.log(data.name);

                //Pokud je uživatel přihlášen, nastaví uživatele na data.user, jinak vrátí null
                if (data.loggedIn){
                    setUser(data.user);
                }
                else{
                    setUser(null);
                }
            }
            catch {
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return { user, loading };
}