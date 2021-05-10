import React, { useState, useEffect  } from 'react';
import { useHistory, useLocation } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({authService}) => {
   
    const [cards, setCards] = useState([
        {
        id:'1',
        name:'Your Name',
        company: 'Company',
        theme:'light',
        title:'your title',
        email : 'email@gmail.com',
        message: 'your message',
        fileName:'fileName',
        fileURL: null
        }
    ]);
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
                <Editor cards={cards}/>
                <Preview cards={cards}/>


            </div>
            
            <Footer/>
        </section>
    );
}
   


export default Maker;