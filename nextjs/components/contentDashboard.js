import React from 'react'
import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import {Chart, ArcElement} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartPie from './chartPie'
import styles from '../styles/inputGraph.module.css'
Chart.register(ArcElement);

const ContentDashboard = () => {
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

    const thLast = {
        width: '250px',
        paddingRight: '15px'
    }
    
    const tdLast = {
        paddingRight: '15px'
    }

    const [formValue, setFormValue] = useState({
        Device: '',
        MAC_Address: "00:1B:44:11:3A:B7",
        IP: '',
        Create_Date: "2021-05-31",
        Power_Consumption: '',

    });

    const [data, setData] = useState(null);
    const inputDevice = useRef();
    const inputIP = useRef();
    const inputPower = useRef();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:5000/devices");
            const data = response.data;

            setData(data);
        }
        fetchData();
    },[]);

    if (!data) return <p>No profile data</p>

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const addDevice = async (newDevice) => {
        await axios.post('http://localhost:5000/devices/new', newDevice);
        setData([...data, newDevice]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formValue.Device === '' || formValue.IP === '' || formValue.Power_Consumption === '') {
            alert('Please enter device information');
        } else {
            inputDevice.current.value = '';
            inputIP.current.value = '';
            inputPower.current.value = '';
            
            addDevice(formValue);
        }
    }

    let xValues = ["TV", "Washer", "Refrigerator", "Selling Fan"];
    let yValues = [60, 60, 120, 120];

    let barColors = [
        "#ff5f81",
        "#ff9f40",
        "#ffcd56",
        "#4bc0c0",
    ];
    let chartData = {
        labels: xValues,
        datasets: [{
            label: "My First dataset",
            backgroundColor: barColors,
            data: yValues
        }],
    }

    return (
        <div className={styles.content}>
            <div className={styles.content_table}>
                <table className={styles.table}>
                    <thead style={tHead}>
                        <tr>
                            <th style={{...th_td, ...th_tdFirst}}>Device</th>
                            <th style={th_td}>MAC Address</th>
                            <th style={th_td}>IP</th>
                            <th style={th_td}>Created Date</th>
                            <th style={{...th_td, ...thLast}}>Power Consumption (Kw/H)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* insert data */}
                        {data.map((device, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{...th_td, ...th_tdFirst}}>{device.Device}</td>
                                    <td style={th_td}>{device.MAC_Address}</td>
                                    <td style={th_td}>{device.IP}</td>
                                    <td style={th_td}>{device.Create_Date}</td>
                                    <td style={{...th_td, ...tdLast}}>{device.Power_Consumption}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot style={tFoot}>
                        <tr>
                            <th style={{...th_td, ...th_tdFirst, ...th_tdFoot}}>Total</th>
                            <td style={{...th_td, ...th_tdFoot}}></td>
                            <td style={{...th_td, ...th_tdFoot}}></td>
                            <td style={{...th_td, ...th_tdFoot}}></td>
                            <td style={{...th_td, ...tdLast, ...th_tdFoot}} className="total">
                                {data.reduce((result, device) => {
                                    return result + parseInt(device.Power_Consumption);
                                }, 0)}
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <div className={styles.input_graph}>
                    <div className={styles.graphic}>
                        {/* <canvas id={styles.Chart} > */}
                            <ChartPie chartData={chartData}/>
                        {/* </canvas> */}
                    </div>
                    <form action="" id="form" className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.form_group}>
                            <input 
                                type="text" 
                                id="name" 
                                className={styles.form_input} 
                                placeholder="Name" 
                                name="Device" 
                                onChange={handleChange}
                                ref={inputDevice}
                            />
                        </div>
                        <div className={styles.form_group}>
                            <input 
                                type="text" 
                                id="ip" 
                                className={styles.form_input} 
                                placeholder="IP" 
                                name="IP" 
                                onChange={handleChange}
                                ref={inputIP}
                            />
                        </div>
                        <div className={styles.form_group}>
                            <input 
                                type="text" 
                                id="power" 
                                className={styles.form_input} 
                                placeholder="Power" 
                                name="Power_Consumption" 
                                onChange={handleChange}
                                ref={inputPower}
                            />
                        </div>

                        <div className={styles.btn_container}>
                            <button className={styles.btn} type="submit">add device</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContentDashboard