'use client';
import { useEffect } from 'react';

export default function PixelCanvasComponent(props) {
  useEffect(() => {
    // Solo se ejecuta en el cliente
    if (typeof window !== 'undefined') {
      // Cargamos el script dinámicamente. Puedes usar un tag <script> o un import dinámico.
      const script = document.createElement('script');
      script.src = '/js/pixel-canvas.js';
      script.async = true;
      script.onload = () => {
        // Una vez cargado, registramos el componente personalizado.
        if (window.PixelCanvas && typeof window.PixelCanvas.register === 'function') {
          window.PixelCanvas.register();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  // Podés pasar props para personalizarlo, por ejemplo, mediante data-attributes
  // En este ejemplo, seteamos algunos atributos, pero podés modificarlos según tu necesidad.
  return (
    <pixel-canvas
      data-colors={props.colors || "#f8fafc,#f1f5f9,#cbd5e1"}
      data-gap={props.gap || "5"}
      data-speed={props.speed || "35"}
      style={{ width: "100%", height: "100%" }}
    ></pixel-canvas>
  );
}
