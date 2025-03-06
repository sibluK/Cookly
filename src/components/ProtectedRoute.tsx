import { useNavigate } from "react-router";
import { useUser } from "../context/UserProvider";
import React, { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

    const { isAuthenticated } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [])

    return children;
}