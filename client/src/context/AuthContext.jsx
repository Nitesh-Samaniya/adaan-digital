import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export default function AuthContextProvider({children}){
    const [isToken, setIsToken] = useState(localStorage.getItem('adaanDigitalUserToken') || '');

    useEffect(()=>{
        let token = localStorage.getItem('adaanDigitalUserToken') || '';
        setIsToken(token);
    },[])
    
    return(
        <AuthContext.Provider value={{isToken, setIsToken}}>
            {children}
        </AuthContext.Provider>
    )
}