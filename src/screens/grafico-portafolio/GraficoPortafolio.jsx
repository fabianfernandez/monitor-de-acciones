import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./GraficoPortafolio.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoPortafolio() {
  // Datos de ejemplo para el gráfico de torta
  const data = {
    labels: ["Rojo", "Azul", "Verde", "Amarillo"],
    datasets: [
      {
        data: [300, 50, 100, 200],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"],
      },
    ],
  };

  return (
    <Card className="container">
      <Typography variant="h4">Gráficos</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} className="grafico1">
          <Pie data={data} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default GraficoPortafolio;
