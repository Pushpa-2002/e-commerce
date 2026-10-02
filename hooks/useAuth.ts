"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/lib/redux/slices/authSlice";
import { getAccessToken } from "@/lib/token.service";

export function useAuth() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state: any) => state?.auth?.isAuthenticated
    );
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Rehydrate Redux from localStorage once on mount
    useEffect(() => {
        if (!mounted) return;
        if (isAuthenticated) return;
        const token = getAccessToken();
        if (token) dispatch(login({ token: token, username: "" }));
    }, [mounted, isAuthenticated, dispatch]);

    return { isAuthenticated, mounted };
}