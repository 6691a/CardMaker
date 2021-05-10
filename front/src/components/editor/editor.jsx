import React from 'react';
import CardEditFrom from '../card_edit_from/card_edit_from';
import styles from './editor.module.css';

const Editor = ({cards}) => (
  <section className={styles.editor}>
    <h1 className={styles.title}>Card Maker</h1>
    {
      cards.map(card=>(
        <CardEditFrom card={card}/>
      ))
    }
  </section>
);

export default Editor;
