import axios from "axios";
import { API_BASE } from "../../constants";

const API_URL = `${API_BASE}/module/`

// get user modules
const GetUserModules = async(token)=>{
    const config = {
        headers: {
            authorization : `Bearer ${token}`
        }
    }
    const respons = await axios.get(API_URL+'moduleUser', config)

    return respons.data
}

// get user modules
const GetModule = async(id,token)=>{
    const config = {
        headers: {
            authorization : `Bearer ${token}`
        }
    }
    const respons = await axios.get(API_URL+id, config)

    return respons.data
}


const modulesService = {
    GetUserModules,
    GetModule
}

export default modulesService