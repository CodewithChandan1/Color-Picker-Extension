import React from 'react';
import { Plus, Pipette } from 'lucide-react';
import { useEyeDropper } from '../../hooks/useEyeDropper';

export default function ColorPickerForm({
  selectedColor,
  colorName,
  onColorChange,
  onNameChange,
  onSaveColor,
}) {
  const { isSupported: isEyeDropperSupported, pickColor } = useEyeDropper();

  const handleEyeDropper = async () => {
    const color = await pickColor();
    if (color) {
      onColorChange(color);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pick a Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="flex-1 h-12 rounded cursor-pointer"
          />
          {isEyeDropperSupported && (
            <button
              onClick={handleEyeDropper}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              title="Pick color from screen"
            >
              <Pipette className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Name
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={colorName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter color name"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onSaveColor}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}