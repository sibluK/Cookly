import { useNavigate } from "react-router";
import { useUser } from "../context/UserProvider";
import { useEffect } from "react";

export default function Logout() {

    const { logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/login');
    }, [])

    return null;
}