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
  Button,
  Grid,
} from "@mui/material";
import "./TablaDePesoPortafolio.css";

function TablaDePesoPortafolio() {
  const [datos, setDatos] = useState([]);
  const [precioActualInput, setPrecioActualInput] = useState({});
  const [totalActualPonderado, setTotalActualPonderado] = useState({});
  const [contenedorDatos, setContenedorDatos] = useState({});
  useEffect(() => {
    cargarOperaciones();
    cargarValoresActuales();
  }, []);

  // Función para procesar los datos de las operaciones
  const procesarDatos = (operaciones) => {
    const datosProcesados = [];
    // Objeto para almacenar temporalmente los totales por acción
    const totalesPorAccion = {};
    const cantidadAccionesAux = {};
    let totalComisiones = 0;
    operaciones.forEach((operacion) => {
      const { accion, valorOperacion, cantidadAcciones, comision } = operacion;
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
      totalComisiones += parseFloat(comision);
    });
    let totalInvertido = 0;
    // Convertir los totales por acción en filas de datos
    for (const accion in totalesPorAccion) {
      const montoInvertido = totalesPorAccion[accion];
      const porcentajeMontoInvertido = (montoInvertido / getTotalInvertido(operaciones)) * 100;
      const numeroAcciones = cantidadAccionesAux[accion] || 0;
      const precioActual = precioActualInput[accion] || 0;
      const totalActualPonderadoAux = totalActualPonderado[accion] || 0;
      totalInvertido += montoInvertido;
      datosProcesados.push({
        accion,
        montoInvertido,
        porcentajeMontoInvertido,
        numeroAcciones,
        precioActual,
        totalActualPonderadoAux,
      });
    }
    setContenedorDatos({ ...contenedorDatos, totalInvertido, totalComisiones });
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

  const guardarValoresActuales = () => {
    localStorage.setItem("preciosActualesPortafolio", JSON.stringify(precioActualInput));
    localStorage.setItem("totalesActualesPortafolio", JSON.stringify(totalActualPonderado));
  };

  const cargarValoresActuales = () => {
    const preciosActualesLocalStorage = localStorage.getItem("preciosActualesPortafolio");
    if (preciosActualesLocalStorage) {
      const preciosActuales = JSON.parse(preciosActualesLocalStorage);
      setPrecioActualInput(preciosActuales);
    }
    const totalesActualesLocalStorage = localStorage.getItem("totalesActualesPortafolio");
    if (totalesActualesLocalStorage) {
      const totalesActuales = JSON.parse(totalesActualesLocalStorage);
      // const gananciaCapital = calcularTotalGanado(totalesActuales);
      // const rentabilidad = calcularRentabilidad(gananciaCapital, contenedorDatos.totalInvertido);
      // setContenedorDatos({ ...contenedorDatos, gananciaCapital, rentabilidad });
      setTotalActualPonderado(totalesActuales);
    }
  };

  const cargarOperaciones = () => {
    const operacionesLocalStorage = localStorage.getItem("operaciones");
    if (operacionesLocalStorage) {
      const operaciones = JSON.parse(operacionesLocalStorage);
      const datosProcesados = procesarDatos(operaciones);
      setDatos(datosProcesados);
    }
  };

  const calcularTotalGanado = (totalesActuales) => {
    let total = 0;
    Object.values(totalesActuales).forEach((totalPonderado) => {
      total += totalPonderado;
    });
    return total;
  };

  const calcularRentabilidad = (gananciaCapital, totalInvertido) => {
    const utilidad = gananciaCapital - totalInvertido;
    console.log(gananciaCapital, totalInvertido);
    const rentabilidad = (utilidad / totalInvertido) * 100;
    return rentabilidad;
  };

  const gananciaCapital = calcularTotalGanado(totalActualPonderado);
  const rentabilidad = calcularRentabilidad(gananciaCapital, contenedorDatos.totalInvertido);

  return (
    <Card className="container">
      <div className="titulo">
        <Typography variant="h4">Peso del portafolio</Typography>
        <Button variant="contained" onClick={guardarValoresActuales}>
          Guardar valores portafolio
        </Button>
      </div>
      <Grid container justifyContent={"space-between"} className="contenedor-datos">
        <Grid item>
          <Typography>Total invertido: {contenedorDatos.totalInvertido || 0}</Typography>
        </Grid>
        <Grid item>
          <Typography>Comisiones: {contenedorDatos.totalComisiones || 0}</Typography>
        </Grid>
        <Grid item>
          <Typography>Rentabilidad del capital: {rentabilidad.toFixed(2) || 0}%</Typography>
        </Grid>
        <Grid item>
          <Typography>Valor de la inversion: {gananciaCapital || 0}</Typography>
        </Grid>
      </Grid>
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
                      handlePrecioActualChange(fila.accion, e.target.value, fila.numeroAcciones)
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
