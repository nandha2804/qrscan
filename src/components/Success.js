import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    // Automatically navigate to QR Code Scanner after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/qr-scanner');
        }, 9000); // 3 seconds delay

        return () => clearTimeout(timer); // Clean up timer if component unmounts
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                <h2 className="text-2xl font-semibold text-teal-700 mb-4">Attendance Marked Successfully!</h2>
                <p className="text-gray-700 mb-6">Redirecting to QR Code Scanner...</p>
                <button
                    onClick={() => navigate('/qr-scanner')}
                    className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200"
                >
                    Go to QR Code Scanner
                </button>
            </div>
        </div>
    );
};

export default Success;
