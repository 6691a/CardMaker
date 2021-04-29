import axios from "axios";
import BASE_URL from './urls';

class AuthService {
    constructor() {
        this.axios = axios.create({
            baseURL : BASE_URL + '/users',
            //params: {},
            // headers: {
            //     Authorization: localStorage.getItem('assess_token') ?
            //     'JWT' + localStorage.getItem('assess_token') : null,
            //     'Content-Type': 'application/json',
            //     accept: 'application/json'
            // },
        })
    }

    async login(formData) {
        console.log(formData)
        const response = await this.axios.post('login/',{
            username: formData.username,
            password: formData.password
        })
        .then((response)=>{
            console.log (response.data);
        })
        .catch((error)=>{
            console.log(error.response.data);
        });

    }

    async kakaoLogin() {


        
    }

    setToken(token) {
        
    }
}

export default AuthService