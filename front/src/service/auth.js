import axios from "axios";
import BASE_URL from '../utility/urls';
import Utility from '../utility/utility';
import {KAKAO_JS_KEY} from '../utility/keys'; 

class AuthService {
    constructor() {
        this.utility = new Utility();
        this.TOKEN_DAY = 1;
        this.USER_COOKIE_NAME = 'uTK';

        this.kakao = new Kakao(KAKAO_JS_KEY);
      
       
        
        this.axios = axios.create({
            baseURL : BASE_URL + '/users',
            //params: {},
            
            headers: {
                Authorization: this.utility.getCookie(this.USER_COOKIE_NAME) ?
                'Token ' + this.utility.getCookie(this.USER_COOKIE_NAME) : null
            },
        })
        
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

    async getUser() {     
        const response = await this.axios.post('/',{
        })
        return response.data    
    }


}

class Kakao{
    constructor(key){
        this.kakaoScript = document.createElement("script");
        this.kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
        document.head.appendChild(this.kakaoScript);
        this.kakaoScript.onload = () => {
            window.Kakao.init(key);
        }
        
    }


    login() {

        window.Kakao.Auth.login({
            scope: 'profile, account_email',
            success: (response) => {
                const token = response.access_token
                this.get_user(token)
                .then((result)=>{
                    return result;           
                })               
            },
            fail: (err) => {
                alert(JSON.stringify(err))
            },
        })

    }

    async get_user(token) {
        let result;
        await window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(response) {
                const account = response.kakao_account
                result = response;
            },
            fail: (err) => {
                alert(JSON.stringify(err))
                result = null
            },

        })
        return result
    }
    



}



export default AuthService