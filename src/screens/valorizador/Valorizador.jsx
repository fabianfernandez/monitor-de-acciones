import React, { useState } from "react";
import { Card, Grid, TextField, Typography, Button } from "@mui/material";

function Valorizador() {
  const [roe, setRoe] = useState(0);
  const [beneficios, setBeneficios] = useState(0);
  const [payout, setPayout] = useState(0);
  const [n, setN] = useState(0);
  const [tasaRetencion, setTasaRetencion] = useState(0);
  const [g, setG] = useState(0);
  const [beneficioFuturo, setBeneficioFuturo] = useState(0);
  const [perFuturo, setPerFuturo] = useState(0);
  const [precioFuturo, setPrecioFuturo] = useState(0);
  const [precioActual, setPrecioActual] = useState(0);
  const [rentabilidadFutura, setRentabilidadFutura] = useState(0);

  const handleRoeChange = (event) => {
    setRoe(event.target.value);
  };

  const handleBeneficiosChange = (event) => {
    setBeneficios(event.target.value);
  };

  const handlePayoutChange = (event) => {
    setPayout(event.target.value);
  };

  const handleNChange = (event) => {
    setN(event.target.value);
  };

  const handlePerFuturoChange = (event) => {
    setPerFuturo(event.target.value);
  };

  const handlePrecioActualChange = (event) => {
    setPrecioActual(event.target.value);
  };

  const calcularParametros = () => {
    const tasaRetencionValue = (1 - parseFloat(payout)).toFixed(5);
    setTasaRetencion(tasaRetencionValue);

    const gValue = (parseFloat(tasaRetencionValue) * parseFloat(roe)).toFixed(5);
    setG(gValue);

    const beneficioFuturoValue = (
      parseFloat(beneficios) * Math.pow(1 + parseFloat(gValue), parseInt(n))
    ).toFixed(5);
    setBeneficioFuturo(beneficioFuturoValue);
    const precioFuturoValue = beneficioFuturoValue * perFuturo;
    setPrecioFuturo(precioFuturoValue);
    const rentabilidadFuturaValor = ((precioFuturoValue / parseFloat(precioActual)) * 100).toFixed(
      2
    );
    console.log("rentabilidadFuturaValor: ", precioFuturoValue / precioActual);
    setRentabilidadFutura(rentabilidadFuturaValor);
  };

  return (
    <Card className="container">
      <div className="titulo">
        <Typography variant="h4">Valorizador</Typography>
        <Button variant="contained" onClick={calcularParametros}>
          Calcular
        </Button>
      </div>
      <Grid container spacing={3} direction={"row"} rowSpacing={10}>
        <Grid item xs={6} display={"flex"} flexDirection={"column"} gap={2}>
          <TextField
            label="Precio Actual"
            variant="outlined"
            value={precioActual}
            onChange={handlePrecioActualChange}
            fullWidth
          />
          <TextField
            label="ROE"
            variant="outlined"
            value={roe}
            onChange={handleRoeChange}
            fullWidth
          />
          <TextField
            label="Beneficios"
            variant="outlined"
            value={beneficios}
            onChange={handleBeneficiosChange}
            fullWidth
          />
          <TextField
            label="Payout"
            variant="outlined"
            value={payout}
            onChange={handlePayoutChange}
            fullWidth
          />
          <TextField
            label="Cantidad de años"
            variant="outlined"
            value={n}
            onChange={handleNChange}
            fullWidth
          />
          <TextField
            label="Per Futuro"
            variant="outlined"
            value={perFuturo}
            onChange={handlePerFuturoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography>Tasa de retención de utilidades: {tasaRetencion}</Typography>
          <Typography>G: {g}</Typography>
          <Typography>Beneficio futuro: {beneficioFuturo}</Typography>
          <Typography>Precio futuro: {precioFuturo}</Typography>
          <Typography>Posible rentabilidad futura: {rentabilidadFutura} %</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Valorizador;
