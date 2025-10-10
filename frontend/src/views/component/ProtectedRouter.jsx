import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRouter({children}){
    const token = localStorage.getItem('token');

    useEffect(()=>{
        if(!token){
            toast.warning("Login Required");
        }
    },[token]);

    if(!token){
        return <Navigate to={"/login"} replace />
    }
    return children;
}