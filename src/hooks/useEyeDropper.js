import { useState, useCallback } from 'react';

export function useEyeDropper() {
  const [isSupported] = useState(() => 'EyeDropper' in window);
  const [isActive, setIsActive] = useState(false);

  const pickColor = useCallback(async () => {
    if (!isSupported) return null;

    try {
      setIsActive(true);
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      return result.sRGBHex;
    } catch (e) {
      console.error('Error picking color:', e);
      return null;
    } finally {
      setIsActive(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    isActive,
    pickColor
  };
}