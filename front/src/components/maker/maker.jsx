import React, { useState, useEffect  } from 'react';
import { useHistory, useLocation } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({FileInput, authService, cardRepository}) => {
    const location = useLocation();
    const [user, setUser] = useState(location.state && location.state.user);
    const history = useHistory();
    const [cards, setCards] = useState({});


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
        if(!user) {
            goLogin();
        }        
    });

    useEffect(() => {
        if(!user) {
            return
        }
        cardRepository.getCards(user.username, (card)=> {
            setCards(card);
        });
    }, [user]);



    const createOrupdateCard = (card) => {
       
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            // console.log(cards)
            return updated;
        });
        cardRepository.saveCard(user.username, card)
    }

    const deleteCard = (card) => {
          
        setCards(cards => {
            const updated = { ...cards };
            console.log(updated[0])
            console.log(updated[1])

            console.log(updated[2])
            console.log(card.id)
             console.log(updated[card.id])

            delete updated[card.id];
            return updated;
        });
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} user={user}/>

            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} addCard={createOrupdateCard} updateCard={createOrupdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>


            </div>
            
            <Footer/>
        </section>
    );
}
   


export default Maker;