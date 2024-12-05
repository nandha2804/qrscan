import React from 'react';
import { Link } from 'react-router-dom';
import logo from './apptechknowlogo.jpeg'; // Replace with the actual logo path

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-pink-50 to-lime-50">
            {/* Navbar */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                {/* Left side: AppteckKnow logo with larger size */}
                <img src={logo} alt="ApptechKnow Logo" className="w-30 h-20 object-contain" /> {/* Increased logo size */}

                {/* Centered Heading */}
                <h1 className="text-2xl font-semibold text-teal-700 mx-auto">AppteKnow Careers-Your Job is Our Success</h1>
            </div>

            {/* Main Content Container */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center space-y-8">
                    {/* Welcome Message */}
                    <h2 className="text-2xl font-semibold text-teal-700 mb-6">
                        Welcome to the Attendance Marking System
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Track and manage attendance with ease.
                    </p>

                    {/* Login and Register Buttons */}
                    <div className="space-y-4">
                        <Link to="/login">
                            <button className="w-full bg-teal-500 text-white font-medium py-3 rounded-xl shadow-md hover:bg-teal-600 hover:shadow-lg transition-all duration-200">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="w-full bg-lime-500 text-white font-medium py-3 rounded-xl shadow-md hover:bg-lime-600 hover:shadow-lg transition-all duration-200">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
