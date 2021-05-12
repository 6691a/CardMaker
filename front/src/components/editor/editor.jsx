import React from 'react';
import CardEditFrom from '../card_edit_from/card_edit_from';
import CardAddForm from '../card_add_form/card_add_form';


import styles from './editor.module.css';

const Editor = ({FileInput, cards, addCard, updateCard, deleteCard}) => (
  <section className={styles.editor}>
    <h1 className={styles.title}>Card Maker</h1>
    {
      Object.keys(cards).map(key=>(
        <CardEditFrom FileInput={FileInput} key={key} card={cards[key]} updateCard={updateCard} deleteCard={deleteCard}/>
      ))
    }
    <CardAddForm FileInput={FileInput}onAdd={addCard} />
  </section>
);

export default Editor;
