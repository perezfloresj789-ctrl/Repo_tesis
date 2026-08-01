import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';


export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

       <title>Seguridad Ciudadana - Alerta y Reporte Comunidad</title>
       <meta name='description' content='plataforma de alerta ciudadana y reporte de incidentes en la comunidad.'/>
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
html, body {
  background-color: #FFF5C3;
  margin: 0;
  padding: 0;
  height: 100%;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #FFF5C3;
}
::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}`;
