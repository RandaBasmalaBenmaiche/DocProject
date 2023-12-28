import axios from "axios";
import { API_BASE } from "../../constants";

const API_URL = `${API_BASE}/user/`

//regester user

const regester = async (userData)=>{
    const config = {
        headers : {
            "content-type" : "application/json"
        }
    }
    const respons = await axios.post(API_URL+'regester', userData,config)

    if(respons.data){
        
    }

    return respons.data
}

//login user
const login = async (userData)=>{
    const respons = await axios.post(API_URL+'login', userData)

    if(respons.data){
        localStorage.setItem('user', JSON.stringify(respons.data[0]))
    }

    return respons.data
}

// logout user
const logOut = ()=>{
    console.log('user logout')
    localStorage.removeItem('user')
}

const authService = {
    regester,
    login,
    logOut
}

export default authService