import {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!name.trim()  || !email.trim()) {
            alert("Please fill in all fields");
            return;
        }

        localStorage.setItem("cinebookUser", JSON.stringify({ name, email }));
        navigate("/Home");
    };

    return(
        <div className="login-page">
            <div className="login-card">
                <h1>Cine<span>Book</span></h1>
                <p>Login to book your movie tickets</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login;