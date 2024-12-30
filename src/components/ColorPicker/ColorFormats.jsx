import React from 'react';
import ColorFormatDisplay from './ColorFormatDisplay';
import { hexToRgb, hexToHsl } from '../../utils/colorConversion';

export default function ColorFormats({ selectedColor, onCopy, copiedFormat }) {
  const rgbColor = hexToRgb(selectedColor);
  const hslColor = hexToHsl(selectedColor);

  return (
    <div>
      <div className="space-y-4">
        <ColorFormatDisplay label="HEX" value={selectedColor} onCopy={onCopy} />
        <ColorFormatDisplay label="RGB" value={rgbColor} onCopy={onCopy} />
        <ColorFormatDisplay label="HSL" value={hslColor} onCopy={onCopy} />
      </div>

      {copiedFormat && (
        <div className="mt-4 text-sm text-green-600">
          ✓ {copiedFormat.toUpperCase()} copied to clipboard!
        </div>
      )}
    </div>
  );
}