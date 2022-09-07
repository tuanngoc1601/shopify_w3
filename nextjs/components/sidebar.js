import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/sidebar.module.css'
import {MdOutlineDevicesOther, MdSpaceDashboard, MdSettings} from 'react-icons/md'
import {IoTimeSharp} from 'react-icons/io5'
import {FaUserCircle} from 'react-icons/fa'

const Sidebar = ({show, setShow}) => {
    const liStyle = {
        display: 'flex',
        alignItems: 'center',
    }

    const icon = {
        marginLeft: '15px',
        marginRight: '0'
    }

    const [nav, setNav] = useState('Dashboard');
    const sideBarRef = useRef();

    const handleClick = (e) => {
        setNav(e.target.innerText);
    }

    useEffect(() => {
        let handler = (e) => {
            if(!sideBarRef.current.contains(e.target)) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <div ref={sideBarRef} className={show ? `${styles.sidebar} ${styles.show}` : `${styles.sidebar}`}>
            <div className={styles.sidebar_header}>
                <div className={styles.head}>
                    <MdOutlineDevicesOther className={styles.icon_sidebar}/>
                    <span>Device Manager</span>
                </div>
                {/* responsive */}
                <div className={styles.user}>
                    <FaUserCircle className={styles.icon_sidebar}/>
                    <span className="user_name">Welcome John</span>
                </div>
            </div>
            <ul className={styles.links}>
                <li style={liStyle}>
                    <MdSpaceDashboard className={styles.icon_sidebar} style={icon}/>
                    <Link href="/dashboard" passHref>
                        <a className={nav === 'Dashboard' ? `${styles.active_sidebar}` : ''} onClick={handleClick}>Dashboard</a>
                    </Link>
                </li>
                <li style={liStyle}>
                    <IoTimeSharp className={styles.icon_sidebar} style={icon}/>
                    <Link href="/logs" passHref>
                        <a className={nav === 'Logs' ? `${styles.active_sidebar}` : ''} onClick={handleClick}>Logs</a>
                    </Link>
                </li>
                <li style={liStyle}>
                    <MdSettings className={styles.icon_sidebar} style={icon}/>
                    <Link href="/setting" passHref>
                        <a className={nav === 'Setting' ? `${styles.active_sidebar}` : ''} onClick={handleClick}>Settings</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar