import axios from "axios";
import utility from '../utility/utility';
import BASE_URL from '../utility/urls';
import {USER_COOKIE_NAME} from '../utility/cookies';


const axiosInstance = axios.create({
    baseURL : BASE_URL,
    //params: {},
    
    headers: {
        Authorization: utility.getCookie(USER_COOKIE_NAME) ?
        'Token ' + utility.getCookie(USER_COOKIE_NAME) : null
    },
})
export default axiosInstance

