import React from 'react';
import { Copy, X } from 'lucide-react';

export default function SavedColorItem({ color, onCopy, onRemove }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-md border border-gray-200"
          style={{ backgroundColor: color.value }}
        />
        <span className="font-medium">{color.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onCopy(color.value, `${color.name}-hex`)}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={onRemove}
          className="p-1 hover:bg-gray-200 rounded text-red-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}