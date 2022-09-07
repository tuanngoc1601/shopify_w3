import { useRouter } from 'next/router'
import React from 'react'
import {useState, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import styles from '../styles/login.module.css'

const Redirect = ({ to }) => {
    const router = useRouter();

    useEffect(() => {
        router.push(to);
    }, [to]);

    return null;
}

const LoginForm = () => {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const [dataForm, setDataForm] = useState({
        username: "",
        password: ""
    });
    const [isLogin, setIsLogin] = useState(false);

    const pStyle = {
        color: 'red',
        fontSize: '13px'
    }

    if(isLogin) {
        return <Redirect to="/dashboard" />;
    }

    const handleChange = (e) => {
        setDataForm((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const submit = (data) => {
        if(data.username === 'john' && data.password === '1234') {
            setIsLogin(true);
        } else {
            alert('Username or password is incorrect');
        }
    }

    return ( 
        <div className={styles.wrapper}>
            <form action="" method="POST" id="form" onSubmit={handleSubmit(submit)}>
                <h3 className={styles.form_header}>SOIOT SYSTEM</h3>
                <div className={styles.form_group}>
                    <input 
                        type="text" 
                        id="username" 
                        className={styles.form_input} 
                        placeholder="Username" 
                        name="username"
                        onChange={handleChange}
                        {...register("username", {
                            required: true
                        })}
                    />
                    {errors.username && errors.username.type === "required" && <p style={pStyle}>Please enter the user name</p>}
                </div>
                <div className={styles.form_group}>
                    <input 
                        type="password" 
                        id="password" 
                        className={styles.form_input} 
                        placeholder="Password" 
                        name="password"
                        onChange={handleChange}
                        {...register("password", {
                            required: true,
                            minLength: 4
                        })}
                    />
                    {errors.password && errors.password.type === "required" && <p style={pStyle}>Please enter the password</p>}
                    {errors.password && errors.password.type === "minLength" && <p style={pStyle}>Please enter minimum 4 letters</p>}
                </div>
                <div className={styles.login_submit}>
                    <button type="submit" className={styles.btn}>LOGIN</button>
                    <a href="" className={styles.register}>or create new account</a>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;