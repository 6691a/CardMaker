import axios from "axios";
import BASE_URL from '../utility/urls';
import Utility from '../utility/utility';
import {KAKAO_JS_KEY} from '../utility/keys'; 

class AuthService {
    constructor() {
        this.utility = new Utility();
        this.TOKEN_DAY = 1;
        this.USER_COOKIE_NAME = 'uTK';

        this.axios = axios.create({
            baseURL : BASE_URL + '/users',
            //params: {},
            
            headers: {
                Authorization: this.utility.getCookie(this.USER_COOKIE_NAME) ?
                'Token ' + this.utility.getCookie(this.USER_COOKIE_NAME) : null
            },
        })

        this.kakao = new Kakao(KAKAO_JS_KEY, this.axios, this.utility);
    }

    async login(formData) {
        
        const response = await this.axios.post('login/',{
            username: formData.username,
            password: formData.password
        })

        if(response) {
            this.utility.setCookie(this.USER_COOKIE_NAME, response.data.token, this.TOKEN_DAY)
            delete response.data.token
            return response.data
        }
        else {
            console.log(response.data);
            return null
        }
    }

    async logout() {

    }

    async findUser() {     
        const response = await this.axios.post('/',{
        })
       
        return response.data    
    }


}

class Kakao{
    constructor(key, axios, utility){
        this.utility = utility;
        this.axios = axios;
        this.kakaoScript = document.createElement("script");
        this.kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
        document.head.appendChild(this.kakaoScript);
        this.kakaoScript.onload = () => {
            window.Kakao.init(key);
        }
        
    }


    async login() {
        this.get_access_token()
        const user = await this.get_user();

        const data = await this.djang_login(user);
       
        console.log(data)

    }

    get_access_token(){
        window.Kakao.Auth.login({
            scope: 'profile, account_email',
            success: (response) => {
            
            },
            fail: (err) => {

            },
        })
    }

    async get_user() {
        let user;
        await window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(response) {
                user = response;
            },
            fail: (err) => {
                alert(JSON.stringify(err))
            },

        })
        return user
    }
    
    async djang_login(user) {
        const response = await this.axios.post('kakao/login/',{
            username: user.kakao_account.email,
            password: user.id
        })
        return response.data
    }
}



export default AuthService