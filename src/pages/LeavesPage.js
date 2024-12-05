import { useState } from 'react';

function LeavesPage() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'John Doe', type: 'Sick Leave', from: '2024-03-20', to: '2024-03-22', status: 'Pending' },
    { id: 2, name: 'Jane Smith', type: 'Vacation', from: '2024-03-25', to: '2024-03-29', status: 'Pending' },
  ]);

  const handleApprove = (id) => {
    setLeaveRequests(leaveRequests.map(request =>
      request.id === id ? { ...request, status: 'Approved' } : request
    ));
  };

  const handleReject = (id) => {
    setLeaveRequests(leaveRequests.map(request =>
      request.id === id ? { ...request, status: 'Rejected' } : request
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Leave Requests</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.from}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.to}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeavesPage;