import React from 'react';

function RegisterCard() {
    return (
        <div>
            <h2>Register</h2>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterCard;