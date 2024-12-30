import React from 'react';
import SavedColorItem from './SavedColorItem';

export default function SavedColors({ colors, onCopy, onRemove }) {
  if (colors.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Saved Colors</h2>
        <p className="text-gray-500 text-center py-4">
          No colors saved yet. Pick a color and give it a name!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Saved Colors</h2>
      <div className="space-y-3">
        {colors.map((color, index) => (
          <SavedColorItem
            key={index}
            color={color}
            onCopy={onCopy}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}