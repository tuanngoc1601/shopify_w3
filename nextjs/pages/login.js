import LoginForm from '../components/loginForm'
import styles from '../styles/login.module.css'

const Login = () => {
    return (
        <div className={styles.wrapper}>
            <LoginForm />
        </div>
    )
}

export default Login;