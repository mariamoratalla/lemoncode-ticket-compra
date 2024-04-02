import {
  LineaTicket,
  Producto,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from "./modelo";

export const calcularPrecioSinIva = (
  producto: Producto,
  cantidad: number
): number => {
  if (!producto || !cantidad) {
    throw new Error("Introduce producto o cantidad");
  }
  return Number((producto.precio * cantidad).toFixed(2));
};

export const calcularPrecioConIva = (
  producto: Producto,
  cantidad: number
): number => {
  if (!producto || !cantidad) {
    throw new Error("Introduce producto o cantidad");
  }
  const precio = calcularPrecioSinIva(producto, cantidad);
  let iva = 0;

  switch (producto.tipoIva) {
    case "general":
      iva = precio * 0.21;
      break;
    case "reducido":
      iva = precio * 0.1;
      break;
    case "superreducidoA":
      iva = precio * 0.05;
      break;
    case "superreducidoB":
      iva = precio * 0.04;
      break;
    case "superreducidoC":
      iva = iva;
      break;
    case "sinIva":
      iva = iva;
      break;
    default:
      throw new Error("Tipo de IVA no válido");
  }

  return Number((precio + iva).toFixed(2));
};

export const arrayLineas = (lineas: LineaTicket[]): ResultadoLineaTicket[] => {
  const array: ResultadoLineaTicket[] = [];

  lineas.forEach((linea) => {
    array.push({
      nombre: linea.producto.nombre,
      cantidad: linea.cantidad,
      precioSinIva: calcularPrecioSinIva(linea.producto, linea.cantidad),
      tipoIva: linea.producto.tipoIva,
      precioConIva: calcularPrecioConIva(linea.producto, linea.cantidad),
    });
  });

  return array;
};

export const calcularResultadoTotal = (
  lineas: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  let resultado: ResultadoTotalTicket = {
    totalSinIva: 0,
    totalConIva: 0,
    totalIva: 0,
  };

  lineas.forEach((linea) => {
    resultado.totalSinIva += linea.precioSinIva;
    resultado.totalConIva += linea.precioConIva;
    resultado.totalIva = Number(
      (resultado.totalConIva - resultado.totalSinIva).toFixed(2)
    );
  });

  return resultado;
};

export const desgloseIva = (
  lineas: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  const desglose: TotalPorTipoIva[] = [];

  let general = 0;
  let reducido = 0;
  let superreducidoA = 0;
  let superreducidoB = 0;
  let superreducidoC = 0;
  let sinIva = 0;

  lineas.forEach((linea) => {
    switch (linea.tipoIva) {
      case "general":
        general += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
        break;
      case "reducido":
        reducido += Number(
          (linea.precioConIva - linea.precioSinIva).toFixed(2)
        );
        break;
      case "superreducidoA":
        superreducidoA += Number(
          (linea.precioConIva - linea.precioSinIva).toFixed(2)
        );
        break;
      case "superreducidoB":
        superreducidoB += Number(
          (linea.precioConIva - linea.precioSinIva).toFixed(2)
        );
        break;
      case "superreducidoC":
        superreducidoC += Number(
          (linea.precioConIva - linea.precioSinIva).toFixed(2)
        );
        break;
      case "sinIva":
        sinIva += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
        break;
    }
  });

  if (general != 0) {
    desglose.push({
      tipoIva: "general",
      cuantia: general,
    });
  }

  if (reducido != 0) {
    desglose.push({
      tipoIva: "reducido",
      cuantia: reducido,
    });
  }

  if (superreducidoA != 0) {
    desglose.push({
      tipoIva: "superreducidoA",
      cuantia: superreducidoA,
    });
  }

  if (superreducidoB != 0) {
    desglose.push({
      tipoIva: "superreducidoB",
      cuantia: superreducidoB,
    });
  }

  if (lineas.some((linea) => linea.tipoIva === "superreducidoC")) {
    desglose.push({
      tipoIva: "superreducidoC",
      cuantia: superreducidoC,
    });
  }

  if (lineas.some((linea) => linea.tipoIva === "sinIva")) {
    desglose.push({
      tipoIva: "sinIva",
      cuantia: sinIva,
    });
  }

  return desglose;
};
