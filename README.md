# TICKET DE COMPRA

El objetivo de este laboratorio es hacer una calculadora de tickets que permite calcular el precio total de una lista de productos, incluyendo el precio con IVA y el desglose del IVA por tipo de producto.

## ¿Cómo abrir la aplicación?

Pasos:

- Clonate el proyecto.
- Instala las dependencias con `npm install`.
- Ejecuta el sandbox con `npm run dev`.
- Abre el navegador en `http://localhost:5173/` (si ese puerto no te funciona, mira en la consola donde has hecho el build, puede que este ocupado y se haya abierto en otro puerto).

## Estructura

Esta aplicación está organizada en varios archivos:

- `modelo.ts`: aquí se encuentran las interfaces de los tipos de datos del proyecto.
- `ticket.ts`: contiene la función principal para calcular el ticket.
- `ticket.helpers.ts`: contiene las funciones auxiliares que utiliza la función principal.
- _Archivos .spec.ts_: contienen las pruebas unitarias para asegurar el correcto funcionamiento de la aplicación. Para ejecutarlos se pone el comando `npm run test`.
