import React, { useState } from "react";
import { Card, Grid, TextField, Typography, Button } from "@mui/material";

function Valorizador() {
  const [inputs, setInputs] = useState({
    roe: 0,
    beneficios: 0,
    payout: 0,
    n: 0,
    perFuturo: 0,
    precioActual: 0,
  });
  const [resultados, setResultados] = useState({
    tasaRetencion: 0,
    g: 0,
    beneficioFuturo: 0,
    precioFuturo: 0,
    rentabilidadFutura: 0,
  });

  const handleChange = (event, field) => {
    setInputs({ ...inputs, [field]: event.target.value });
  };

  const calcularParametros = () => {
    const tasaRetencionValue = (1 - parseFloat(inputs.payout)).toFixed(5);
    const gValue = (parseFloat(tasaRetencionValue) * parseFloat(inputs.roe)).toFixed(5);
    const beneficioFuturoValue = (
      parseFloat(inputs.beneficios) * Math.pow(1 + parseFloat(gValue), parseInt(inputs.n))
    ).toFixed(5);
    const precioFuturoValue = beneficioFuturoValue * parseFloat(inputs.perFuturo);
    const rentabilidadFuturaValor = (
      (precioFuturoValue / parseFloat(inputs.precioActual)) *
      100
    ).toFixed(2);

    setResultados({
      tasaRetencion: tasaRetencionValue,
      g: gValue,
      beneficioFuturo: beneficioFuturoValue,
      precioFuturo: precioFuturoValue,
      rentabilidadFutura: rentabilidadFuturaValor,
    });
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
            value={inputs.precioActual}
            onChange={(e) => handleChange(e, "precioActual")}
            fullWidth
          />
          <TextField
            label="ROE"
            variant="outlined"
            value={inputs.roe}
            onChange={(e) => handleChange(e, "roe")}
            fullWidth
          />
          <TextField
            label="Beneficios"
            variant="outlined"
            value={inputs.beneficios}
            onChange={(e) => handleChange(e, "beneficios")}
            fullWidth
          />
          <TextField
            label="Payout"
            variant="outlined"
            value={inputs.payout}
            onChange={(e) => handleChange(e, "payout")}
            fullWidth
          />
          <TextField
            label="Cantidad de años"
            variant="outlined"
            value={inputs.n}
            onChange={(e) => handleChange(e, "n")}
            fullWidth
          />
          <TextField
            label="Per Futuro"
            variant="outlined"
            value={inputs.perFuturo}
            onChange={(e) => handleChange(e, "perFuturo")}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography>Tasa de retención de utilidades: {resultados.tasaRetencion}</Typography>
          <Typography>G: {resultados.g}</Typography>
          <Typography>Beneficio futuro: {resultados.beneficioFuturo}</Typography>
          <Typography>Precio futuro: {resultados.precioFuturo}</Typography>
          <Typography>Posible rentabilidad futura: {resultados.rentabilidadFutura} %</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Valorizador;
