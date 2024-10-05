import "../common.css";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BACKEND_URI = "http://localhost:5001/api/";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Define loading state

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission
        setIsLoading(true); // Start loading

        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        try {
            const response = await fetch(`${BACKEND_URI}login`, requestOptions);
            console.log("Response:", response); // Log response for debugging
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.msg || "Login failed");
            } else {
                alert("Login successful!");
                navigate('/todo'); // Redirect to the Todo application
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false); // End loading
        }

        // Clear the input fields
        setUsername("");
        setPassword("");
    };

    return (
        <div className="center-div">
            <h1 className='text-center'>Login</h1>
            <form className='form-group' onSubmit={handleLogin}>
                <label className='m-2 form-label'>User Name:</label>
                <br />
                <input
                    className='m-2 form-control'
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label className='m-2 form-label'>Password:</label>
                <br />
                <input
                    className='m-2 form-control'
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                {isLoading && <div>Loading...</div>} {/* Loading indicator */}
                <br />
                <button className='btn btn-primary' type="submit" disabled={isLoading}>Login</button>
            </form>
            <br />
            <div>
                <Link to='/signup'>
                    <button className='btn btn-primary' style={{ marginTop: "10px" }}>Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;
