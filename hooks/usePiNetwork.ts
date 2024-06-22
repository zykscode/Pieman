// app/hooks/usePiNetwork.ts
import { useState, useEffect } from 'react';



export function usePiNetwork() {
  const [Pi, setPi] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    script.onload = () => {
      window.Pi?.init({ version: "2.0" });
      setPi(window.Pi);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return Pi;
}