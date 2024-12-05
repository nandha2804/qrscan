import React from 'react';

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-8 w-8 ${color.replace('border', 'text')}`} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;