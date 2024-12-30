import React, { useState } from 'react';
import { Palette, Plus, Pipette } from 'lucide-react';
import { hexToRgb, hexToHsl } from '../utils/colorConversion';
import { useEyeDropper } from '../hooks/useEyeDropper';
import ColorDisplay from './ColorDisplay';
import SavedColorsList from './SavedColorsList';
import type { Color } from '../types/color';

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#4A90E2');
  const [colorName, setColorName] = useState('');
  const [savedColors, setSavedColors] = useState<Color[]>([]);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const { isSupported: isEyeDropperSupported, pickColor } = useEyeDropper();

  const rgbColor = hexToRgb(selectedColor);
  const hslColor = hexToHsl(selectedColor);

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const saveColor = () => {
    if (colorName.trim()) {
      setSavedColors(prev => [...prev, { value: selectedColor, name: colorName.trim() }]);
      setColorName('');
    }
  };

  const handleEyeDropper = async () => {
    const color = await pickColor();
    if (color) {
      setSelectedColor(color);
    }
  };

  return (
    <div className="w-[500px] bg-gray-100 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Color Picker Extension
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pick a Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
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
                    onChange={(e) => setColorName(e.target.value)}
                    placeholder="Enter color name"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={saveColor}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <ColorDisplay label="HEX" value={selectedColor} onCopy={copyToClipboard} />
                <ColorDisplay label="RGB" value={rgbColor} onCopy={copyToClipboard} />
                <ColorDisplay label="HSL" value={hslColor} onCopy={copyToClipboard} />
              </div>

              {copiedFormat && (
                <div className="mt-4 text-sm text-green-600">
                  ✓ {copiedFormat.toUpperCase()} copied to clipboard!
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Saved Colors</h2>
              <SavedColorsList
                colors={savedColors}
                onCopy={copyToClipboard}
                onRemove={(index) => setSavedColors(prev => prev.filter((_, i) => i !== index))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}