
import React from 'react';

const RegisterPage: React.FC = () => {
    return (
        <form style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto', padding: '20px' }}>
            <h2>Register</h2>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterPage;
