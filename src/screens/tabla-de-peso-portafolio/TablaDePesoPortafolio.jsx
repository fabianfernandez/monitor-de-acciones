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
  Card,
  Typography,
} from "@mui/material";
import "./TablaDePesoPortafolio.css";

function TablaDePesoPortafolio() {
  const [datos, setDatos] = useState([]);
  const [precioActualInput, setPrecioActualInput] = useState({});
  const [totalActualPonderado, setTotalActualPonderado] = useState({});
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
    const cantidadAccionesAux = {};
    operaciones.forEach((operacion) => {
      const { accion, valorOperacion, cantidadAcciones } = operacion;
      if (totalesPorAccion[accion]) {
        totalesPorAccion[accion] += parseFloat(valorOperacion);
      } else {
        totalesPorAccion[accion] = parseFloat(valorOperacion);
      }
      if (cantidadAccionesAux[accion]) {
        cantidadAccionesAux[accion] += parseFloat(cantidadAcciones);
      } else {
        cantidadAccionesAux[accion] = parseFloat(cantidadAcciones);
      }
    });

    // Convertir los totales por acción en filas de datos
    for (const accion in totalesPorAccion) {
      const montoInvertido = totalesPorAccion[accion];
      const porcentajeMontoInvertido =
        (montoInvertido / getTotalInvertido(operaciones)) * 100;
      const numeroAcciones = cantidadAccionesAux[accion] || 0;
      const precioActual = precioActualInput[accion] || 0;
      const totalActualPonderado = 0;
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
  const handlePrecioActualChange = (accion, valor, numeroAcciones) => {
    setPrecioActualInput({ ...precioActualInput, [accion]: valor });
    setTotalActualPonderado({
      ...totalActualPonderado,
      [accion]: valor * numeroAcciones,
    });
  };

  return (
    <Card className="container">
      <Typography variant="h4">Peso del portafolio</Typography>
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
                <TableCell>
                  {fila.porcentajeMontoInvertido.toFixed(2)}%
                </TableCell>
                <TableCell>{fila.numeroAcciones}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={precioActualInput[fila.accion] || ""}
                    onChange={(e) =>
                      handlePrecioActualChange(
                        fila.accion,
                        e.target.value,
                        fila.numeroAcciones
                      )
                    }
                  />
                </TableCell>
                <TableCell>{totalActualPonderado[fila.accion] || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default TablaDePesoPortafolio;
