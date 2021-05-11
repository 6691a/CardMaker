import React, { useState, useEffect  } from 'react';
import { useHistory, useLocation } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({authService}) => {
    const [cards, setCards] = useState({
        // id는 DB의 PK값으로 만듬
        1: {
            id:'1',
            name:'Your Name',
            company: 'Company',
            theme:'Light',
            title:'your title',
            email : 'email@gmail.com',
            message: 'your message',
            fileName:'fileName',
            fileURL: null
        },
    });

   
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

    // const addCard = (card) => {
    //     const updated = [...cards, card];
    //     setCards(updated);
    // }

    const createOrupdateCard = (card) => {
       
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        });
    }

    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} user={user}/>

            <div className={styles.container}>
                <Editor cards={cards} addCard={createOrupdateCard} updateCard={createOrupdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>


            </div>
            
            <Footer/>
        </section>
    );
}
   


export default Maker;