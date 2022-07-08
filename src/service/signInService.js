import axios from "axios";
import {API_PATH} from "../component/Constants";

export const loginPost = async (value) => {
    try {
        const response = await axios.post(API_PATH + '/auth/login', value,{
            headers: {
                'Accept-Language': 'en'
            }})
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
}
