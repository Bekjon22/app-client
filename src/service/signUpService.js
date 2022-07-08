import axios from "axios";
import {API_PATH} from "../component/Constants";

export const registerPost = async (value) => {
    try {
        const response = await axios.post(API_PATH + '/auth/register', value)
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
}
