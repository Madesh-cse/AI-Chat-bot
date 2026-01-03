import axios from "axios";

export const LoginUser = async(email: string, password: string)=>{
    const res = await axios.post("/user/login", {
        email,
        password
    });
    if(res.status !== 200){
        throw new Error("Unable to Login")
    }

    const data = res.data;
    return data;
}

export const checkAuthStatus = async()=>{
    const res = await axios.get("/user/auth-status");
    if(res.status !== 200){
        throw new Error("Unable to Authenticate")
    }
    const data = res.data;
    return data;
}

export const sendChatRequest = async(message: string)=>{
    const res = await axios.post("/chats/new", {message});
    if(res.status !== 200){
        throw new Error("Unable to send chat")
    }
    const data = res.data;
    return data;
}