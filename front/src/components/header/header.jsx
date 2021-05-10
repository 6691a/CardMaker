import React from 'react';
import styles from './header.module.css';

const Header = ({ user, onLogout }) => (
            <header className={styles.header}>
                <img className={styles.logo} src="/images/logo.png" alt="logo"/>
                <h1 className={styles.title}>Card Maker</h1>

                {
                    onLogout && (
                        <button className={styles.logout} onClick={onLogout}>
                            Logout
                        </button>
                )}
                {
                    user&& (
                        <h3 className={styles.info}>{user.username}</h3>
                    )
                }
            </header>
    );

export default Header;