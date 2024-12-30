import React from 'react';
import { Copy, X } from 'lucide-react';
import type { Color } from '../types/color';

interface SavedColorsListProps {
  colors: Color[];
  onCopy: (value: string, format: string) => void;
  onRemove: (index: number) => void;
}

export default function SavedColorsList({ colors, onCopy, onRemove }: SavedColorsListProps) {
  if (colors.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No colors saved yet. Pick a color and give it a name!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
        >
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
              onClick={() => onRemove(index)}
              className="p-1 hover:bg-gray-200 rounded text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}