// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// import { useSwipeable } from 'react-swipeable';
// import { useCookies } from 'react-cookie';

// const Attendance = () => {
//     const navigate = useNavigate();
//     const [attendanceType, setAttendanceType] = useState('');
//     const [message, setMessage] = useState('');
//     const [isSwiped, setIsSwiped] = useState(false);
//     const [buttonSubmitted, setButtonSubmitted] = useState(false);
//     const [cookies, setCookie] = useCookies(['hasMarkedLogin', 'hasMarkedLunch', 'hasMarkedTea', 'hasMarkedLogout']);

//     useEffect(() => {
//         // Fetch the user's attendance status for the day
//         const fetchAttendanceStatus = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(
//                     'http://localhost:8080/api/attendance/status',
//                     {
//                         headers: { Authorization: `Bearer ${token}` }
//                     }
//                 );
//                 const { loginMarked, lunchMarked, teaMarked } = response.data;
//                 const expires = new Date();
//                 expires.setHours(23, 59, 59, 999);

//                 setCookie('hasMarkedLogin', loginMarked, { path: '/', expires });
//                 setCookie('hasMarkedLunch', lunchMarked, { path: '/', expires });
//                 setCookie('hasMarkedTea', teaMarked, { path: '/', expires });
//             } catch (error) {
//                 console.error("Failed to fetch attendance status:", error);
//             }
//         };
//         fetchAttendanceStatus();
//     }, [setCookie]);

//     const handleAttendance = async () => {
//         const token = localStorage.getItem('token');
//         const id = localStorage.getItem('id');

//         if (!token) {
//             alert("Please log in again.");
//             navigate('/login');
//             return;
//         }

//         try {
//             const decodedToken = jwtDecode(token);
//             const isTokenExpired = decodedToken.exp * 1000 < Date.now();
//             if (isTokenExpired) {
//                 alert("Session expired. Please log in again.");
//                 navigate('/login');
//                 return;
//             }
//         } catch (error) {
//             console.error("Invalid token:", error);
//             alert("Invalid session. Please log in again.");
//             navigate('/login');
//             return;
//         }

//         const currentHour = new Date().getHours();
//         const expires = new Date();
//         expires.setHours(23, 59, 59, 999);

//         // Morning login time (9:00 AM to 9:30 AM)
//         if (attendanceType === 'login') {
//             if (currentHour < 9 || currentHour >= 9.5) {
//                 setMessage("Morning login is only available between 9:00 AM and 9:30 AM.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             if (cookies.hasMarkedLogin) {
//                 setMessage("You have already marked your morning login for today.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             setCookie('hasMarkedLogin', true, { path: '/', expires });
//         }

//         // Lunch attendance time (12:30 PM to 2:30 PM)
//         if (attendanceType === 'lunch') {
//             if (currentHour < 12.5 || currentHour >= 14.5) {
//                 setMessage("Lunch attendance can only be marked between 12:30 PM and 2:30 PM.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             if (cookies.hasMarkedLunch) {
//                 setMessage("Lunch attendance can only be marked once per day.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             setCookie('hasMarkedLunch', true, { path: '/', expires });
//         }

//         // Tea attendance time (4:00 PM to 4:30 PM)
//         if (attendanceType === 'tea') {
//             if (currentHour < 15 || currentHour >= 16.5) {
//                 setMessage("Tea attendance can only be marked between 4:00 PM and 4:30 PM.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             if (cookies.hasMarkedTea) {
//                 setMessage("Tea attendance can only be marked once per day.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             setCookie('hasMarkedTea', true, { path: '/', expires });
//         }

//         // Logout attendance time (5:00 PM to 5:30 PM)
//         if (attendanceType === 'logout') {
//             if (currentHour < 17 || currentHour >= 17.5) {
//                 setMessage("Logout attendance can only be marked between 5:00 PM and 5:30 PM.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             if (cookies.hasMarkedLogout) {
//                 setMessage("Logout attendance can only be marked once per day.");
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//                 return;
//             }
//             setCookie('hasMarkedLogout', true, { path: '/', expires });
//         }

//         const payload = {
//             loginOption: attendanceType,
//             user: { id: id },
//             instituteName: "apteknow",
//             instituteLatitude: 14.5460,
//             instituteLongitude: 77.4550
//         };

//         try {
//             const response = await axios.post(
//                 'http://localhost:8080/api/attendance/add',
//                 payload,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.data && response.data.message) {
//                 setMessage(response.data.message);
//             } else {
//                 setMessage('Attendance marked successfully.');
//             }

//             navigate('/success');
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 alert("Session expired. Please log in again.");
//                 navigate('/login');
//             } else {
//                 setMessage('Attendance marking failed: ' + (error.response?.data.message || error.message));
//                 setTimeout(() => {
//                     setMessage('');
//                     navigate('/login');
//                 }, 5000); // 5 seconds
//             }
//         }
//     };

//     const onSwipedRight = () => {
//         if (!buttonSubmitted) {
//             setIsSwiped(true);
//             setButtonSubmitted(true);
//             setTimeout(() => {
//                 handleAttendance();
//             }, 500);
//         }
//     };

//     const swipeHandlers = useSwipeable({
//         onSwipedRight,
//         trackMouse: true,
//     });

//     return (
//         <div
//             {...swipeHandlers}
//             className="min-h-screen bg-gradient-to-tr from-teal-100 via-teal-50 to-gray-100 flex items-center justify-center"
//         >
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Mark Attendance</h2>

//                 <select
//                     value={attendanceType}
//                     onChange={(e) => setAttendanceType(e.target.value)}
//                     required
//                     className="block w-full p-3 mb-5 border border-gray-300 rounded-md bg-gray-50 text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
//                 >
//                     <option value="">Select Attendance Type</option>
//                     <option value="login">Morning Login</option>
//                     <option value="lunch">Lunch</option>
//                     <option value="tea">Tea Break</option>
//                     <option value="logout">Logout</option>
//                 </select>

//                 <div className="relative w-64 h-12 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
//                     {!isSwiped ? (
//                         <div
//                             className="absolute top-0 left-0 h-full bg-red-500 text-white flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
//                             style={{ width: '50%' }}
//                             onClick={onSwipedRight}
//                         >
//                             Slide to Send
//                         </div>
//                     ) : (
//                         <div
//                             className="absolute top-0 right-0 h-full w-full bg-green-500 text-white flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
//                         >
//                             Sending...
//                         </div>
//                     )}
//                 </div>

//                 {message && (
//                     <p className="mt-4 text-center text-teal-600 font-semibold">
//                         {message}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Attendance;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode }from 'jwt-decode'; // Corrected import
import { useSwipeable } from 'react-swipeable';
import { useCookies } from 'react-cookie';

const Attendance = () => {
    const navigate = useNavigate();
    const [attendanceType, setAttendanceType] = useState('');
    const [message, setMessage] = useState('');
    const [isSwiped, setIsSwiped] = useState(false);
    const [buttonSubmitted, setButtonSubmitted] = useState(false);
    const [cookies, setCookie] = useCookies(['hasMarkedLogin', 'hasMarkedLunch', 'hasMarkedTea', 'hasMarkedLogout', 'instituteId']);
    
    useEffect(() => {
        const fetchAttendanceStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/attendance/status', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { loginMarked, lunchMarked, teaMarked, instituteId } = response.data;
                const expires = new Date();
                expires.setHours(23, 59, 59, 999);
                setCookie('hasMarkedLogin', loginMarked, { path: '/', expires });
                setCookie('hasMarkedLunch', lunchMarked, { path: '/', expires });
                setCookie('hasMarkedTea', teaMarked, { path: '/', expires });
                setCookie('instituteId', instituteId, { path: '/', expires });
            } catch (error) {
                console.error("Failed to fetch attendance status:", error);
                setMessage("Failed to load attendance status.");
            }
        };
        fetchAttendanceStatus();
    }, [setCookie]);

    const handleAttendance = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (!token || !userId) {
            alert("Session expired or user ID missing. Please log in again.");
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                alert("Session expired. Please log in again.");
                navigate('/login');
                return;
            }
        } catch (error) {
            console.error("Invalid token:", error);
            alert("Invalid session. Please log in again.");
            navigate('/login');
            return;
        }

        const currentHour = new Date().getHours();
        const expires = new Date();
        expires.setHours(23, 59, 59, 999);

        const attendanceConstraints = {
            login: { start: 9, end: 9.5, cookie: 'hasMarkedLogin' },
            // lunch: { start: 12.5, end: 14.5, cookie: 'hasMarkedLunch' },
            // tea: { start: 16, end: 16.5, cookie: 'hasMarkedTea' },
            logout: { start: 17, end: 17.5, cookie: 'hasMarkedLogout' },
        };

        const { start, end, cookie } = attendanceConstraints[attendanceType] || {};
        if (start && (currentHour < start || currentHour >= end)) {
            setMessage(`${attendanceType.charAt(0).toUpperCase() + attendanceType.slice(1)} attendance can only be marked between ${start}:00 and ${end}:00.`);
            setTimeout(() => setMessage(''), 5000);
            return;
        }

        if (cookies[cookie]) {
            setMessage(`${attendanceType.charAt(0).toUpperCase() + attendanceType.slice(1)} attendance can only be marked once per day.`);
            setTimeout(() => setMessage(''), 5000);
            return;
        }
        setCookie(cookie, true, { path: '/', expires });

        const payload = {
            loginOption: attendanceType,
            user: { id: userId },
            instituteId: cookies.instituteId,
        };

        try {
            const response = await axios.post(
                'https://qrscan-latest.onrender.com/api/attendance/add',
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data || 'Attendance marked successfully.');
            navigate('/success');
        } catch (error) {
            console.error("Error marking attendance:", error);
            setMessage('Failed to mark attendance. Please try again.');
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const onSwipedRight = () => {
        if (!buttonSubmitted) {
            setIsSwiped(true);
            setButtonSubmitted(true);
            setTimeout(() => {
                handleAttendance();
            }, 500);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedRight,
        trackMouse: true,
    });

    return (
        <div {...swipeHandlers} className="min-h-screen bg-gradient-to-tr from-teal-100 via-teal-50 to-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Mark Your Attendance</h2>
                <div>
                    <button onClick={() => setAttendanceType('login')}>Login</button>
                   
                    <button onClick={() => setAttendanceType('logout')}>Logout</button>
                    <button onClick={handleAttendance}>Submit</button>
                    <p className="text-red-600">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Attendance;



































