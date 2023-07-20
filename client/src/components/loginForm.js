const LoginForm = (props) => {
    return (
        <div className="login-form" onSubmit={(event) => props.handleLogin(event)}>
        <form >
        <div>
            Email
            <input 
            type="text"
            value={props.email}
            name="Email"
            onChange= {({target}) => {
            props.setEmail(target.value)}}/>
        </div>
        <div>
            password
            <input
            type="text"
            value={props.password}
            name="Password"
            onChange= {({target}) => props.setPassword(target.value)} />
        </div>
        <button type="submit" >login</button>
        </form>
    </div>
    )
}
export default LoginForm;