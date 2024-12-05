import { useState } from 'react';

function AbsenteesPage() {
  const [absentees] = useState([
    { id: 1, name: 'Mike Johnson', department: 'Marketing', date: '2024-03-15', reason: 'Sick Leave' },
    { id: 2, name: 'Sarah Williams', department: 'HR', date: '2024-03-15', reason: 'Personal Emergency' },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Today's Absentees</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {absentees.map((absentee) => (
              <tr key={absentee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{absentee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{absentee.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{absentee.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{absentee.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AbsenteesPage;