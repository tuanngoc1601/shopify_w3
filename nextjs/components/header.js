import React from 'react'
import { useState } from 'react'
import styles from '../styles/heading.module.css'
import {FaUserCircle, FaBars} from 'react-icons/fa'

const Header = ({setShow}) => {
    const showSideBar = () => {
        setShow(true);
    }
    return (
        <header className={styles.heading}>
            <FaBars className={styles.icon_bar} onClick={() => showSideBar()}/>
            <div className={styles.user}>
                <FaUserCircle className={styles.icon_user}/>
                <span className={styles.user_name}>Welcome John</span>
            </div>
        </header>
    )
}

export default Header