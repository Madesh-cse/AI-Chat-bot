import { useContext, useEffect, useState, type ReactNode } from "react";
import { createContext } from "react";
import { checkAuthStatus, LoginUser } from "../../helper/api-communicators";

type User = {
    name: string;
    email: string;
}   

type userAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string)=>Promise<void>;
    signup: (name: string, email: string, password:string)=>Promise<void>;
    logout: ()=> Promise<void>
}

const AuthContext = createContext <userAuth | null>(null);

export const AuthProvider = ({children}: {children: ReactNode})=>{

    const [user,setuser] = useState<User | null>(null);
    const [isLoggedIn,setisLoggedIn] = useState(false);

    useEffect(()=>{
        // fetch the user cookies  are valid then skip login
        async function checkStatus(){
            const data = await checkAuthStatus();
            if(data){
                setuser({
                    email: data.email,
                    name: data.name
                })
                setisLoggedIn(true)
            }
        }
        checkStatus()
    },[])

    // we creating the methods
    const login = async(email: string, password: string)=>{
        const data = await LoginUser(email, password);
        if(data){
            setuser({
                email: data.email,
                name: data.name
            });
            setisLoggedIn(true);
        }
    }
    const signup = async(name: string,email: string, password: string)=>{

    }
    const logout = async()=>{

    }

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout
    };
    return <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)