// TablaDePesoPortafolio.jsx

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

function TablaDePesoPortafolio() {
  const [datos, setDatos] = useState([]);
  const [precioActualInput, setPrecioActualInput] = useState({});

  useEffect(() => {
    const operacionesLocalStorage = localStorage.getItem("operaciones");
    if (operacionesLocalStorage) {
      const operaciones = JSON.parse(operacionesLocalStorage);
      const datosProcesados = procesarDatos(operaciones);
      setDatos(datosProcesados);
    }
  }, []);

  // Función para procesar los datos de las operaciones
  const procesarDatos = (operaciones) => {
    const datosProcesados = [];
    // Objeto para almacenar temporalmente los totales por acción
    const totalesPorAccion = {};

    operaciones.forEach((operacion) => {
      const { accion, valorOperacion, cantidadAcciones } = operacion;
      if (totalesPorAccion[accion]) {
        totalesPorAccion[accion] += parseFloat(valorOperacion);
      } else {
        totalesPorAccion[accion] = parseFloat(valorOperacion);
      }
    });

    // Convertir los totales por acción en filas de datos
    for (const accion in totalesPorAccion) {
      const montoInvertido = totalesPorAccion[accion];
      const porcentajeMontoInvertido =
        (montoInvertido / getTotalInvertido(operaciones)) * 100;
      const numeroAcciones = operaciones.reduce(
        (total, operacion) =>
          operacion.accion === accion
            ? total + parseInt(operacion.cantidadAcciones, 10)
            : total,
        0
      );
      const precioActual = precioActualInput[accion] || 0;
      const totalActualPonderado = precioActual * numeroAcciones;
      datosProcesados.push({
        accion,
        montoInvertido,
        porcentajeMontoInvertido,
        numeroAcciones,
        precioActual,
        totalActualPonderado,
      });
    }

    return datosProcesados;
  };

  // Función para calcular el monto total invertido en todas las operaciones
  const getTotalInvertido = (operaciones) => {
    return operaciones.reduce(
      (total, operacion) => total + parseFloat(operacion.valorOperacion),
      0
    );
  };

  // Manejador para el cambio de precio actual de una acción
  const handlePrecioActualChange = (accion, valor) => {
    setPrecioActualInput({ ...precioActualInput, [accion]: valor });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Acción</TableCell>
            <TableCell>Monto invertido</TableCell>
            <TableCell>Porcentaje monto invertido</TableCell>
            <TableCell>Número de acciones</TableCell>
            <TableCell>Precio actual</TableCell>
            <TableCell>Total actual ponderado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((fila, index) => (
            <TableRow key={index}>
              <TableCell>{fila.accion}</TableCell>
              <TableCell>{fila.montoInvertido}</TableCell>
              <TableCell>{fila.porcentajeMontoInvertido.toFixed(2)}%</TableCell>
              <TableCell>{fila.numeroAcciones}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={precioActualInput[fila.accion] || ""}
                  onChange={(e) =>
                    handlePrecioActualChange(fila.accion, e.target.value)
                  }
                />
              </TableCell>
              <TableCell>{fila.totalActualPonderado.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaDePesoPortafolio;
