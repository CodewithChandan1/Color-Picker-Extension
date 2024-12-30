import React from 'react';
import { Palette } from 'lucide-react';

export default function ColorPickerHeader() {
  return (
    <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <Palette className="w-6 h-6" />
      Color Picker
    </h1>
  );
}