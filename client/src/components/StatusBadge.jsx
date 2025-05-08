// src/components/StatusBadge.jsx
import React from 'react';

const statusStyles = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  rejected: 'bg-red-100 text-red-700',
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
