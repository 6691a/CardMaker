import React, { useRef } from 'react';
import Button from '../ui/button/button';
import styles from './card_edit_from.module.css';

const CardEditFrom = ({FileInput, card, updateCard, deleteCard}) => {
    const {
        name,
        company,
        title,
        email,
        message,
        theme,
        fileName,
        fileURL,
    } = card;

    const formRef = useRef();
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    // const onSave = (event) => {
    //     event.prevemtDefault();
    //     const card = {
    //         name: nameRef.current.value || '',
    //         company: companyRef.current.value || '',
    //         theme: themeRef.current.value,
    //         title: titleRef.current.value || '',
    //         email: emailRef.current.value || '',
    //         message: messageRef.current.value || '',
    //         fileName: '',
    //         fileURL: '',
    //     }
    //     formRef.current.reset();
    //     onSave(card);
  
    // }
    const onChange = (event) => {
        if (event.currentTarget == null) {
            return;
          }
          event.preventDefault();
          updateCard({
            ...card,
            [event.currentTarget.name]: event.currentTarget.value,
          });

    }

    const onDelete = () => {
        deleteCard(card);
    };
    
    return(
        <form className={styles.form} ref={formRef}>
            <input className={styles.input} ref ={nameRef} onChange={onChange} type="text" name="name" value={name} />
            <input className={styles.input} ref ={companyRef} onChange={onChange} type="text" name="company" value={company} />
            <select className={styles.select} ref ={themeRef} onChange={onChange}  name="theme" value={theme}>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Colorful">Colorful</option>
            </select>
            <input className={styles.input} ref ={titleRef} onChange={onChange} type="text" name="title" value={title} />
            <input className={styles.input} ref ={emailRef} onChange={onChange} type="text" name="email" value={email} />
            <textarea className={styles.textarea} ref ={messageRef} onChange={onChange} name="message" value={message}></textarea>
            <div className={styles.fileInput}>
                <FileInput/>
            </div>
            <Button name="삭제" onClick={onDelete} />
        </form>
    )
};
            
    

export default CardEditFrom;