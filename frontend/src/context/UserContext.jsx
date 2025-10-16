import { useContext, useState, createContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState(()=>{
        try{
            const stored = localStorage.getItem('user');
            return stored ? JSON.parse(stored) : null;
        }catch{
            return null;
        }
    });

    useEffect(()=>{
        try{
            if(user) localStorage.setItem('user', JSON.stringify(user));
            else localStorage.removeItem('user');
        }catch{}
    },[user]);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);