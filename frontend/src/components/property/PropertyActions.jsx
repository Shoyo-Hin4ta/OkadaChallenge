import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const PropertyActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        aria-label="Edit property"
      >
        <Edit2 size={18} />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Delete property"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default PropertyActions;