import axios from 'axios'
import { API_BASE } from '../../constants'

const API_URL = `${API_BASE}/coure/`

// get cours modules
const getCoures = async(id, token)=>{
    const config = {
        headers: {
            authorization : `Bearer ${token}`
        }
    }
    const respons = await axios.get(API_URL+"couremodule/"+id ,config)

    return respons.data
}

const coursService = {
    getCoures
}

export default coursService