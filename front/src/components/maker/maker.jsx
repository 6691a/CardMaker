import React, { useState, useEffect  } from 'react';
import { useHistory, useLocation } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({authService}) => {
   

    const location = useLocation();
    const history = useHistory();
    let user;
    if (location.state){
        user = location.state.user;
    }

   

    const onLogout = () =>{
       authService.logout()
       .then(()=>{
           goLogin();
       });
    }

    const goLogin = () => {
        history.push({
            pathname: '/',
        });
    }

    
    useEffect(() => {
        if(!user){
            //goLogin();
        }
        
    });


    return (
        <section className={styles.maker}>

            <Header onLogout={onLogout} user={user}/>
            <div className={styles.container}>
                <Editor />
                <Preview />


            </div>
            <Footer/>
        </section>
    );
}
   


export default Maker;