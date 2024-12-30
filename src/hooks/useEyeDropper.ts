import { useState, useCallback } from 'react';

interface EyeDropperResult {
  sRGBHex: string;
}

export function useEyeDropper() {
  const [isSupported] = useState(() => 'EyeDropper' in window);
  const [isActive, setIsActive] = useState(false);

  const pickColor = useCallback(async () => {
    if (!isSupported) return null;

    try {
      setIsActive(true);
      // @ts-ignore - EyeDropper API is not yet in TypeScript
      const eyeDropper = new window.EyeDropper();
      const result: EyeDropperResult = await eyeDropper.open();
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