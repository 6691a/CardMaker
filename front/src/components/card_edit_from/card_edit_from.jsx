import React from 'react';
import Button from '../ui/button/button';
import ImageInput from '../ui/image_input/image_input';
import styles from './card_edit_from.module.css';

const CardEditFrom = ({card}) => {
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

    const onSave = () => {

    }
    return(
        <form className={styles.form}>
            <input className={styles.input} type="text" name="name" value={name} />
            <input className={styles.input} type="text" name="company" value={company} />
            <select className={styles.select} name="theme" value={theme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorful">Colorful</option>
            </select>
            <input className={styles.input} type="text" name="title" value={title} />
            <input className={styles.input} type="text" name="email" value={email} />
            <textarea className={styles.textarea} name="message" value={message}></textarea>
            <div className={styles.fileInput}>
                <ImageInput/>
            </div>
            <Button name='저장' onClick={onSave}/>
        </form>
    )
};
            
    

export default CardEditFrom;