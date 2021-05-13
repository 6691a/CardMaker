import axios from "axios";
import BASE_URL from '../utility/urls';
import {USER_COOKIE_NAME} from '../utility/cookies';

class Axios {
    constructor(utility) {
        this.utility = utility;
        this.axios = axios.create({
            baseURL : BASE_URL + '/users',
            //params: {},
            
            headers: {
                Authorization: utility.getCookie(USER_COOKIE_NAME) ?
                'Token ' + utility.getCookie(USER_COOKIE_NAME) : null
            },
        })

    }
}

export default Axios
