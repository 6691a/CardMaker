import React, {useRef, useState} from 'react';
import styles from './image_input.module.css';
const ImageInput = ({imageUploader, name, onFileChange }) => {
    const inputRef = useRef();
    const [loading, setLoading] = useState(false);

    const onClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const onChange = async (event) => {
        setLoading(true);
        const uploaded = await imageUploader.upload(event.target.files[0]);
        setLoading(false);
        onFileChange({
            name: 'fileName',
            url: '',
        })
    };

    return (
        <div className={styles.container}>
            <input className={styles.input} onChange={onChange} ref={inputRef} type="file" accept="image/*" name="file" />
            {
                !loading && 
                <button className={`${styles.button} ${name ? styles.pink : styles.grey}`} onClick={onClick}>{name || 'No file'}</button>

            }
            {
                loading &&  
                <div className={styles.loading}>
                
                </div>
            }               
        </div>
    ) 
};
export default ImageInput;