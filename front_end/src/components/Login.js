import React from "react";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleLogin = async () => {
        console.warn(email, password);
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input className="inputbox" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input  className="inputbox"type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="login-btn">Login</button>
        </div>
    );
}

export default Login;