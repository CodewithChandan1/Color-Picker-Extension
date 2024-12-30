import { useState } from 'react';

export function useColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#4A90E2');
  const [colorName, setColorName] = useState('');
  const [savedColors, setSavedColors] = useState([]);
  const [copiedFormat, setCopiedFormat] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleNameChange = (name) => {
    setColorName(name);
  };

  const handleSaveColor = () => {
    if (colorName.trim()) {
      setSavedColors(prev => [...prev, { value: selectedColor, name: colorName.trim() }]);
      setColorName('');
    }
  };

  const handleCopyToClipboard = async (text, format) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRemoveColor = (index) => {
    setSavedColors(prev => prev.filter((_, i) => i !== index));
  };

  return {
    selectedColor,
    colorName,
    savedColors,
    copiedFormat,
    handleColorChange,
    handleNameChange,
    handleSaveColor,
    handleCopyToClipboard,
    handleRemoveColor,
  };
}