import React, {useRef} from 'react';
import styles from './image_input.module.css';
const ImageInput = ({imageUploader, name, onFileChange }) => {
    const inputRef = useRef();

    const onClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const onChange = async (event) => {
        const uploaded = await imageUploader.upload(event.target.files[0]);
        onFileChange({
            name: 'fileName',
            url: '',
        })
    };

    return (
        <div className={styles.container}>
            <input className={styles.input} onChange={onChange} ref={inputRef} type="file" accept="image/*" name="file" />
            <button className={styles.button} onClick={onClick}>{name || 'No file'}</button>
        </div>
    ) 
};
export default ImageInput;