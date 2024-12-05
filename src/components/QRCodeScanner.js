import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleScan = (result) => {
        if (result) {
            let data = result.text;
            data = data.replace(/([a-zA-Z]+):/g, '"$1":').replace(/'/g, '"');
            try {
                const parsedData = JSON.parse(data);
                console.log(parsedData.institutename);
                checkLocation(); // Calls location check after scanning QR
            } catch (err) {
                console.error("Error parsing QR code data", err);
                setError('Invalid QR code format');
            }
        }
    };

    const handleError = (error) => {
        console.error("QR Code scanning error:", error);
        setError('Unable to access camera or scan QR code');
    };

    const checkLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const instituteLatitude = 12.9165;
                const instituteLongitude = 77.6014;

                const distance = calculateDistance(latitude, longitude, instituteLatitude, instituteLongitude);
                if (distance <= 50) {
                    navigate('/attendance');
                } else {
                    alert('You must be within a 50-meter radius of the institute.');
                }
            }, (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to retrieve your location. Please allow location access.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInMetres = R * c * 1000; // Converts to meters
        return distanceInMetres;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-200 to-green-300 flex justify-center items-center py-8 px-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto transition-all ease-in-out transform hover:scale-105">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center text-teal-700">QR Code Scanner</h2>

                {error ? (
                    <p className="text-red-500 mb-6 text-center font-semibold">{error}</p>
                ) : (
                    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl">
                        <QrReader
                            onResult={handleScan}
                            onError={handleError}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // Ensures the camera feed fills the entire container
                            }}
                        />
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80"></div>
                        {/* Adding a subtle border effect to the scanner */}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <p className="text-lg text-gray-700 font-semibold">Ensure you're within the institute's premises to scan the code.</p>
                    <p className="text-sm text-gray-500 mt-2">If you face any issues, please contact support.</p>
                </div>
            </div>
        </div>
    );
};

export default QRCodeScanner;
