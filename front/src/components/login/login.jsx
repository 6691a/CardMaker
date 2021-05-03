import React, { useState, useEffect  } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import { useCookies } from 'react-cookie';
import styles from './login.module.css';

const Login = ({authService}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['uTK']);
    
    const history = useHistory();

    const [user, setUser] = useState();

    const initFormData = Object.freeze({
        username: '',
        password: ''
    });
    const [formData, setFormData] = useState(initFormData);

    const goToHome = (user) => {
        history.push({
            pathname: '/maker',
            state: {
                user: user,
            },
        });
    }


    const onLogin = (event) => {
        authService.login(formData)
        .then((user)=>{
            console.log(user)
            goToHome(user);
        })
    };

    useEffect(() => {
         authService.getUser()
         .then((user)=>{
            //console.log(user);
            goToHome(user);
         })
        .catch((error)=>{
            console.log('getUser Error');
        }); 
         
         
    });

    const onFomeChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    };

    const kakaoLogin= () => {
        authService.kakao.login()
        // authService.kakao.login()
        // data = authService.kakao.login()
        // console.log(data)
    }



    return (
        <section>
            <Header/>
            <section>
                <h1>Login</h1>
                <ui>
                    <li>
                        <input type="text" name='username' placeholder='아이디' onChange={onFomeChange}/>

                    </li>
                    <li>
                        <input type="password" name='password' placeholder='비밀번호' onChange={onFomeChange}/>
                    </li>
                    <li>
                        <button onClick={onLogin}>로그인</button>
                    </li>
                    <li>
                        <a onClick={kakaoLogin}>
                            <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" alt="" width="222"/>
                        </a>
                    </li>
                </ui>
            </section>
            <Footer/>
        </section>
    );
}

export default Login;