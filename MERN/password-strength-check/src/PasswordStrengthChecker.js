import React, { useState, useEffect } from 'react';
import axios from 'axios';

const options = {
    headers: {
        "Access-Control-Allow-Origin": "*", 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0',
    }
}

const PasswordStrengthChecker = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [result, setResult] = useState(null);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchRecords();
    }, [records]);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/password-strength');
            setRecords(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/password-strength/', { password, steps: result }, options);
            if (response.data) {
                setResult(response.data.steps);
                setPassword('');
                alert("Password Saved successfully");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const minimumStepsToMakePasswordStrong = (e) => {
        setPassword(e.target.value)
        let password = e.target.value
        let steps = 0;

        // Check if password length is between 6 and 20 characters
        const lengthDiff = Math.max(0, Math.abs(password.length - 13) - 7);
        steps += lengthDiff;

        // Check if password contains at least one lowercase letter, one uppercase letter, and one digit
        const Pass_LUD = (!/[a-z]/.test(password) ? 1 : 0) + (!/[A-Z]/.test(password) ? 1 : 0) + (!/\d/.test(password) ? 1 : 0);
        steps += Pass_LUD;

        // Check if password contains three repeating characters in a row
        let repeat = 0;
        for (let i = 2; i < password.length; i++) {
            repeat += password[i] === password[i - 1] && password[i - 1] === password[i - 2] ? 1 : 0;
        }
        steps += repeat;

        // If password is already strong return 0 and else return the minimum number of steps required to make password strong.
        // return steps;
        setResult((lengthDiff === 0 && Pass_LUD === 0 && repeat === 0) ? steps : Math.max(lengthDiff, Pass_LUD, repeat));
        // return result;
        // return Math.min(steps, lengthDiff);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Password Strength Checker</h2><br />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                value={password}
                                onChange={minimumStepsToMakePasswordStrong}
                                required
                            />
                            <small className="form-text text-muted">
                                {showPassword ? 'Password is visible' : 'Password is hidden'}
                            </small>
                        </div><br />
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="passwordVisibility"
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                            />
                            <label className="form-check-label" htmlFor="passwordVisibility">
                                Show password
                            </label>
                        </div>
                        {result && (
                            <div className="text-center">
                                <p>Output: {result}</p>
                            </div>
                        )}
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">
                                Save
                            </button>
                        </div>
                    </form><br />
                    {records.length > 0 && (
                        <div className="d-flex justify-content-center">
                            <div>
                                <h3>Fetched All Record in MangoDB</h3><br />
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Input Password</th>
                                            <th>Output Steps</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map((record) => (
                                            <tr key={record._id}>
                                                <td>{record.password}</td>
                                                <td>{record.steps}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordStrengthChecker;
