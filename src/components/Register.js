/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default role set to 'user'
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const adminCredentials = {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'adminpassword123',
    };

    useEffect(() => {
        if (role === 'ADMIN') {
            setUsername(adminCredentials.username);
            setEmail(adminCredentials.email);
            setPassword(adminCredentials.password);
        } else {
            setUsername('');
            setEmail('');
            setPassword('');
        }
    }, [role]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (role === 'ADMIN') {
                // Logic to check if an admin exists (can be done on the backend)
                const response = await api.post('/check-admin');
                if (response.data.exists) {
                    setMessage('Admin account already exists. Please log in.');
                    return;
                }
            }
            // Send username, email, password, and role to the backend
            await api.post('/register', { username, email, password, role });
            setMessage('Registration successful. You can now log in.');
            navigate('/login'); // Navigate to login page after successful registration
        } catch (error) {
            console.error('Registration Error:', error.response || error);
            setMessage('Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-orange-100">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-gray-700 text-center mb-6">Register</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter your username"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Role</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition duration-300 transform hover:-translate-y-1"
                    >
                        Register
                    </button>
                    {message && (
                        <p className={`text-center mt-4 ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'} font-medium`}>
                            {message}
                        </p>
                    )}
                </form>
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account? 
                    <a href="/login" className="text-green-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;*/


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default role set to 'USER'
    const [course, setCourse] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const adminCredentials = {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'adminpassword123',
    };

    useEffect(() => {
        if (role === 'ADMIN') {
            setName(adminCredentials.name);
            setEmail(adminCredentials.email);
            setPassword(adminCredentials.password);
            setCourse(''); // Admin doesn't need a course
        } else {
            setName('');
            setEmail('');
            setPassword('');
            setCourse(''); // Reset course for user
        }
    }, [role]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (role === 'ADMIN') {
                const response = await api.post('/check-admin');
                if (response.data.exists) {
                    setMessage('Admin account already exists. Please log in.');
                    return;
                }
            }
            // Send name, email, password, role, and course to the backend
            await api.post('/register', { name, email, password, role, course });
            setMessage('Registration successful. You can now log in.');
            navigate('/login'); // Navigate to login page after successful registration
        } catch (error) {
            console.error('Registration Error:', error.response || error);
            setMessage('Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-orange-100">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-gray-700 text-center mb-6">Register</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter your name"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Role</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    {role === 'USER' && (
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Course</label>
                            <select 
                                value={course} 
                                onChange={(e) => setCourse(e.target.value)} 
                                required 
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            >
                                <option value="">Select your course</option>
                                <option value="Java Full Stack">Java Full Stack</option>
                                <option value="Python Full Stack">Python Full Stack</option>
                                <option value="Data Analyst">Data Analyst</option>
                                <option value="Testing">Testing</option>
                            </select>
                        </div>
                    )}
                    <button 
                        type="submit"
                        className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition duration-300 transform hover:-translate-y-1"
                    >
                        Register
                    </button>
                    {message && (
                        <p className={`text-center mt-4 ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'} font-medium`}>
                            {message}
                        </p>
                    )}
                </form>
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account? 
                    <a href="/login" className="text-green-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;

