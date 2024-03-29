import React, { useState } from "react";
import { Card, Grid, TextField, Typography, Button } from "@mui/material";

function Valorizador() {
  const [roe, setRoe] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [payout, setPayout] = useState("");
  const [n, setN] = useState("");
  const [tasaRetencion, setTasaRetencion] = useState("");
  const [g, setG] = useState("");
  const [beneficioFuturo, setBeneficioFuturo] = useState("");

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

  const calcularParametros = () => {
    const tasaRetencionValue = (1 - parseFloat(payout)).toFixed(5);
    setTasaRetencion(tasaRetencionValue);

    const gValue = (parseFloat(tasaRetencionValue) * parseFloat(roe)).toFixed(5);
    setG(gValue);

    const beneficioFuturoValue = (
      parseFloat(beneficios) * Math.pow(1 + parseFloat(gValue), parseInt(n))
    ).toFixed(5);
    setBeneficioFuturo(beneficioFuturoValue);
  };

  return (
    <Card className="container">
      <div className="titulo">
        <Typography variant="h4">Valorizador</Typography>
        <Button variant="contained" onClick={calcularParametros}>
          Calcular
        </Button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="ROE"
            variant="outlined"
            value={roe}
            onChange={handleRoeChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Beneficios"
            variant="outlined"
            value={beneficios}
            onChange={handleBeneficiosChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Payout"
            variant="outlined"
            value={payout}
            onChange={handlePayoutChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="n" variant="outlined" value={n} onChange={handleNChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Typography>Tasa de retención de utilidades: {tasaRetencion}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>G: {g}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Beneficio futuro: {beneficioFuturo}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Valorizador;
