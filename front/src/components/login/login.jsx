import React, { useState } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

const Login = ({authService}) => {

    const initFormData = Object.freeze({
        username: '',
        password: ''
    });
    const [formData, setFormData] = useState(initFormData);

    const onLogin = (event) => {
        authService.login(formData);
    };

    const onFomeChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    };



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
                        <button>Kakao</button>
                    </li>
                </ui>
            </section>
            <Footer/>
        </section>
    );
}

export default Login;