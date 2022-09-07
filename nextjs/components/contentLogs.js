import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styles from '../styles/logs.module.css'

const ContentLogs = () => {
    const content = {
        marginTop: '44px',
        marginLeft: '280px'
    }

    const content_table = {
        maxWidth: '50%',
        margin: '50px auto 0px auto'
    }

    const span = {
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '24px'
    }

    const table = {
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        display: 'block'
    } 

    const tHead = {
        height: '50px'
    }

    const th_td = {
        borderBottom: '1px solid #ddd',
        height: '40px',
        width: '200px',
        textAlign: 'right',
        fontSize: '13px'
    }

    const th_tdFirst = {
        textAlign: 'left',
        paddingLeft: '15px'
    }

    const tFoot = {
        backgroundColor: '#fafbfb'
    }

    const th_tdFoot = {
        height: '45px',
        fontWeight: 600
    }

    const thFirst = {
        width: '300px'
    }

    const th_tdLast = {
        paddingRight: '20px'
    }

    const [page, setPage] = useState(1);
    const [data, setData] = useState();
    const [inputValue, setInputValue] = useState('');
    const span1 = useRef();
    const span2 = useRef();
    const span3 = useRef();

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleInput = (event) => {
        if(event.target.value === '') {
            if(page === 1) {
                axios.get('http://localhost:5000/logs/page/1')
                .then((response) => {
                    setData(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            } else {
                setPage(1);
            }
        }
    }

    const handleSearch = () => {
        if(inputValue === '') {
            alert('Please enter a value');
        } else {
            axios.get('http://localhost:5000/logs')
            .then(function (response) {
                console.log(response);
                const data = response.data.filter(function (log) {
                    return (log.name.toUpperCase() === inputValue.toUpperCase());
                });
                setData(data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        }
    }

    const handleClick = (e) => {
        setPage(parseInt(e.target.innerText));
    }

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`http://localhost:5000/logs/page/${page}`);
            const data = response.data;
            console.log(data.lenght);
            setData(data);
        }
        getData();
    }, [page]);

    if (!data) return <p>No profile data</p>

    return (
        <div style={content}>
            <div style={content_table}>
                {/* Search Logs */}
                <div className={styles.content_header}>
                    <div className={styles.title}>
                        <span style={span}>Action Logs</span>
                    </div>
                    <div className={styles.btn_input}>
                        <input 
                            type="text" 
                            id="name" 
                            className={styles.form_input} 
                            placeholder="name" 
                            name="name"
                            onChange={handleChange}
                            onInput={handleInput}
                        />
                        <button className={styles.btn_search} onClick={handleSearch}>Search</button>
                    </div>
                </div>

                {/* Table Logs */}
                <table style={table}>
                    <thead style={tHead}>
                        <tr>
                            <th style={{...th_td, ...th_tdFirst, ...thFirst}}>Device ID #</th>
                            <th style={th_td}>Name</th>
                            <th style={th_td}>Action</th>
                            <th style={{...th_td, ...th_tdLast}}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* insert data */}
                        {data.map((log, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{...th_td, ...th_tdFirst}}>{log.device_id}</td>
                                    <td style={th_td}>{log.name}</td>
                                    <td style={th_td}>{log.action}</td>
                                    <td style={{...th_td, ...th_tdLast}}>{log.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot style={tFoot}>
                        <tr>
                            <th style={{...th_td, ...th_tdFirst, ...thFirst, ...th_tdFoot}}>Total</th>
                            <td style={{...th_td, ...th_tdFoot}}></td>
                            <td style={{...th_td, ...th_tdFoot}}></td>
                            <td style={{...th_td, ...th_tdFoot, ...th_tdLast}}>290</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Route Page */}
                <div className={styles.route_page}>
                    <span className={page === 1 ? `${styles.link_page} ${styles.active}`: `${styles.link_page}`} onClick={handleClick} ref={span1}>1</span>
                    <span className={page === 2 ? `${styles.link_page} ${styles.active}`: `${styles.link_page}`} onClick={handleClick} ref={span2}>2</span>
                    <span className={page === 3 ? `${styles.link_page} ${styles.active}`: `${styles.link_page}`} onClick={handleClick} ref={span3}>3</span>
                </div>
            </div>
        </div>
    )
}

export default ContentLogs