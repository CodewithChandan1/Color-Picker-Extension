import React from 'react';
import ColorPickerHeader from './ColorPickerHeader';
import ColorPickerForm from './ColorPickerForm';
import ColorFormats from './ColorFormats';
import SavedColors from './SavedColors';
import { useColorPicker } from './useColorPicker';

export default function ColorPicker() {
  const {
    selectedColor,
    colorName,
    savedColors,
    copiedFormat,
    handleColorChange,
    handleNameChange,
    handleSaveColor,
    handleCopyToClipboard,
    handleRemoveColor,
  } = useColorPicker();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <ColorPickerHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ColorPickerForm
                selectedColor={selectedColor}
                colorName={colorName}
                onColorChange={handleColorChange}
                onNameChange={handleNameChange}
                onSaveColor={handleSaveColor}
              />
              
              <ColorFormats
                selectedColor={selectedColor}
                onCopy={handleCopyToClipboard}
                copiedFormat={copiedFormat}
              />
            </div>

            <SavedColors
              colors={savedColors}
              onCopy={handleCopyToClipboard}
              onRemove={handleRemoveColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}