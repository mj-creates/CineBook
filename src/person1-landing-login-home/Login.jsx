import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert("Please fill in all fields");
            return;
        }

        localStorage.setItem("cinebookUser", JSON.stringify({ name, email }));
        navigate("/Home");
    };

    return (
        <div className="login-page">
            <div className="login-visual">
                <h1>Cine<span>Book</span></h1>
                <p className="visual-tagline">Grab your seat before someone else does 🍿</p>
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>

            <div className="login-form-side">
                <div className="login-card">
                    <h2>Welcome back</h2>
                    <p>Enter your details to continue</p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="e.g. Rohan Reddy"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="e.g. rohan@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">Continue to Movies →</button>
                    </form>

                    <p className="login-hint">New here? You'll land straight on our now-showing list.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;