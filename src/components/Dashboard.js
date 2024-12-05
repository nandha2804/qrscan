import { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaUsers, FaUserClock, FaCalendarCheck, FaExclamationTriangle } from 'react-icons/fa';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import Header from './Header';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [attendanceData, setAttendanceData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Present',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Absent',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  });
  const [activities] = useState([
    {
      id: 1,
      content: 'John Doe marked attendance',
      time: '2 hours ago',
      icon: <FaUserClock className="text-white h-5 w-5" />,
      iconBackground: 'bg-blue-500',
    },
    {
      id: 2,
      content: 'Leave request approved for Sarah',
      time: '4 hours ago',
      icon: <FaCalendarCheck className="text-white h-5 w-5" />,
      iconBackground: 'bg-green-500',
    },
    {
      id: 3,
      content: 'New candidate registered',
      time: '1 day ago',
      icon: <FaUsers className="text-white h-5 w-5" />,
      iconBackground: 'bg-purple-500',
    },
  ]);

  // Fetch total students and attendance data
  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await fetch('https://qrscan-latest.onrender.com/admin/users/count');
        const data = await response.json();
        setTotalStudents(data.total);
      } catch (error) {
        console.error('Error fetching total students:', error);
        setTotalStudents(0); // Fallback in case of an error
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/attendance/all');  // Replace with your endpoint for weekly attendance
        const data = await response.json();
        const presentData = data.present || [0, 0, 0, 0, 0];  // Fallback to empty data if not available
        const absentData = data.absent || [0, 0, 0, 0, 0];  // Fallback to empty data if not available

        // Update chart data
        setAttendanceData((prevState) => ({
          ...prevState,
          datasets: [
            { ...prevState.datasets[0], data: presentData },
            { ...prevState.datasets[1], data: absentData },
          ],
        }));
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setAttendanceData({
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          datasets: [
            { label: 'Present', data: [0, 0, 0, 0, 0], backgroundColor: 'rgba(34, 197, 94, 0.5)', borderColor: 'rgb(34, 197, 94)', borderWidth: 1 },
            { label: 'Absent', data: [0, 0, 0, 0, 0], backgroundColor: 'rgba(239, 68, 68, 0.5)', borderColor: 'rgb(239, 68, 68)', borderWidth: 1 },
          ],
        }); // Set fallback data on error
      }
    };

    fetchTotalStudents();
    fetchAttendanceData();
  }, []);
  useEffect(() => {
    const fetchPresentToday = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/attendance/count/present-today');
        const data = await response.json();
        console.log('Present today:', data.presentToday); // Log the result
        setPresentToday(data.presentToday); // Update state
      } catch (error) {
        console.error('Error fetching present today count:', error);
        setPresentToday(0); // Fallback in case of an error
      }
    };
  
    fetchPresentToday();
  }, []);

  const departmentData = {
    labels: ['Java Fullstack', 'Python', 'Testing', 'Data Analytics', 'AI'],
    datasets: [
      {
        data: [30, 20, 15, 10, 25],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
      },
    ],
  };

  const handleBarClick = (event, elements) => {
    if (!elements.length) return;
    const index = elements[0].index;
    const day = attendanceData.labels[index];
    const datasetIndex = elements[0].datasetIndex;
    const type = datasetIndex === 0 ? 'Present' : 'Absent';
    alert(`View all ${type} candidates for ${day}`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />
      {/* Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Students" value={totalStudents} icon={FaUsers} color="border-blue-500" />
          <StatCard title="Present Today" value={totalStudents} icon={FaUserClock} color="border-green-500" />
          <StatCard title="On Leave" value="8" icon={FaCalendarCheck} color="border-yellow-500" />
          <StatCard title="Absent" value="10" icon={FaExclamationTriangle} color="border-red-500" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Overview</h3>
              <Bar
                data={attendanceData}
                options={{
                  responsive: true,
                  onClick: handleBarClick,
                  scales: {
                    y: { beginAtZero: true },
                  },
                  plugins: { legend: { position: 'top' } },
                }}
              />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
              <Doughnut
                data={departmentData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: 'bottom' } },
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Activities and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity activities={activities} />
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" onClick={() => alert('Mark Attendance feature coming soon!')}>
                  Mark Attendance
                </button>
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors" onClick={() => alert('Leave Application feature coming soon!')}>
                  Apply Leave
                </button>
                <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors" onClick={() => alert('Reports feature coming soon!')}>
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
