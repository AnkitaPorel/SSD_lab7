import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../common.css";

const BACKEND_URI = "http://localhost:5001/api/";

function SignUpForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/');
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill all fields.");
            return;
        }

        setIsSubmitting(true); // Disable submit button
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        try {
            const res = await fetch(BACKEND_URI + "register", requestOptions);
            const data = await res.json();

            if (res.ok) { // Change here to use res.ok for success
                alert(data.msg);
                setUsername("");
                setPassword("");
                navigateToLogin();
            } else {
                setError(data.msg); // Set error if user already exists or any other error
            }
        } catch (err) {
            setError("Something went wrong with the registration.");
        } finally {
            setIsSubmitting(false); // Re-enable submit button
        }
    };

    return (
        <div className="center-div">
            <h1 className='text-center'>Sign Up</h1>
            <form className='form-group' onSubmit={handleSignUp}>
                <label className='m-2 form-label'>User-name: </label>
                <input
                    className='m-2 form-control'
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className='m-2 form-label'>Password: </label>
                <input
                    className='m-2 form-control'
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error-message">{error}</div>} {/* Display error message */}
                <button className='mt-4 btn btn-primary' type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
            </form>
            <p className='m-4'>Already Registered? <Link to='/login'>Login Here</Link></p>
        </div>
    );
}

export default SignUpForm;