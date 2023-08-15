import styles from './LoginForm.module.css'


const LoginForm = (props) => {
    const logAdmin = () => {
        props.setEmail("admin@email.com")
        props.setPassword("admin")
        props.handleLogin()
    }
    const logUser = () => {
        props.setEmail("DemoUser@email.com")
        props.setPassword("DemoUserPassword")
        props.handleLogin()
    }
    return (
        <div className={styles.loginPage}>
            <div className={styles.container} id="container">
                <div className={`${styles.formContainer} ${styles.loginFormContainer}`}  >
                    <form className={styles.form} onSubmit={(event) => props.handleLogin(event)}>
                        <h1> Sign in</h1>
                        <div>
                            <input 
                            type="text"
                            placeholder="Email"
                            value={props.email}
                            className={styles.input}
                            name="Email"
                            onChange= {({target}) => {
                            props.setEmail(target.value)}}/>
                        </div>
                        <div>
                            <input
                            type="text"
                            placeholder="Password"
                            value={props.password}
                            className={styles.input}
                            name="Password"
                            onChange= {({target}) => props.setPassword(target.value)} />
                        </div>
                        <button type="submit" className={styles.button} >login</button>
                        <div className={styles.demoContainer}>
                            <div>
                                <button className={`${styles.button} ${styles.demoButton}`} onClick={() => logAdmin()}>Login as Admin</button>
                            </div>
                            <div>
                                <button className={`${styles.button} ${styles.demoButton}`} onClick = {() => logUser()}>Login as User</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
    )
}
export default LoginForm;