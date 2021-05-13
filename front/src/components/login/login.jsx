import React, { useState, useEffect  } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import { useCookies } from 'react-cookie';
import styles from './login.module.css';

const Login = ({authService}) => {
  
    
    const history = useHistory();



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
            goToHome(user);
        })
    };

    const onFomeChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    };

    const kakaoLogin= () => {
        authService.kakao.login()
        .then((user)=>{
            
            goToHome(user);
            window.location.reload();

        })
    }

    useEffect(() => {
        authService.findUser()
        .then((user)=>{
            console.log(user);
            if(user){
                goToHome(user);
            }
        })
        .catch((error)=>{
            console.log('getUser Error');
        }); 
    });

   



    return (
        <section className={styles.login}>
            <Header/>
            <section>
                {/* <h1>Login</h1> */}
                <ui className={styles.list}>
                    <li className={styles.item}>
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