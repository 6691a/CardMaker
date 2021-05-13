import {KAKAO_JS_KEY} from '../utility/keys'; 
import {USER_COOKIE_NAME} from '../utility/cookies';

const TOKEN_DAY = 1;

class AuthService {
    constructor(axios, utility) {
 
        this.utility = utility;
        this.axios = axios;
        this.kakao = new Kakao(KAKAO_JS_KEY, this.axios, this.utility);
    }

    async login(formData) {
        const response = await this.axios.post('login/',{
            username: formData.username,
            password: formData.password
        })

        if(response) {
            this.utility.setCookie(USER_COOKIE_NAME, response.data.token, TOKEN_DAY)
            delete response.data.token
            return response.data
        }
        else {
            console.log(response.data);
            return null
        }
    }

    async logout() {
        this.utility.deleteCookie(USER_COOKIE_NAME);
    }

    async findUser() {
        if(this.utility.getCookie(USER_COOKIE_NAME)){
            const response = await this.axios.post('/',{

            })
            return response.data 
        }
    }
}

class Kakao{
    constructor(key, axios, utility){
        this.axios = axios;
        this.utility = utility
        this.kakaoScript = document.createElement("script");
        this.kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
        document.head.appendChild(this.kakaoScript);
        this.kakaoScript.onload = () => {
            window.Kakao.init(key);
        }
    }


    async login() {
        // const token = await 
        this.get_access_token()

        const user = await this.get_user();

        const data = await this.djang_login(user);
        console.log(data)
        return data;
    }

    async get_access_token(){
        // let token;
        await window.Kakao.Auth.login({
            scope: 'profile, account_email',
            success: (response) => {
                // token = response;
            },
            fail: (err) => {

            },
        })
        // return token
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

        if(response) {
            this.utility.setCookie(USER_COOKIE_NAME, response.data.token, TOKEN_DAY)
            delete response.data.token

            return response.data
        }
    }
}



export default AuthService