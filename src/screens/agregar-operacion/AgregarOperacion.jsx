import React, { useState, useEffect } from "react";
import { TextField, Grid, MenuItem } from "@mui/material";

function AgregarOperacion({ valores, handleChange }) {
  const [acciones, setAcciones] = useState([]);

  useEffect(() => {
    cargarAccionesDesdeLocalStorage();
  }, []);

  const cargarAccionesDesdeLocalStorage = () => {
    const accionesLocalStorage = localStorage.getItem("acciones");
    if (accionesLocalStorage) {
      setAcciones(JSON.parse(accionesLocalStorage));
    }
  };

  const guardarAccionesEnLocalStorage = (acciones) => {
    localStorage.setItem("acciones", JSON.stringify(acciones));
  };

  const handleInputChange = (campo, valor) => {
    handleChange(campo, valor);

    if (campo === "accion" && valor.trim() !== "") {
      // Filtrar acciones que coincidan con el valor ingresado
      const accionesFiltradas = acciones.filter((acc) =>
        acc.toLowerCase().includes(valor.toLowerCase())
      );

      // Si no se encuentra ninguna acción que coincida, permitir agregar una nueva acción
      if (accionesFiltradas.length === 0 && !acciones.includes(valor)) {
        setAcciones([...acciones, valor]);
        guardarAccionesEnLocalStorage([...acciones, valor]);
      }
    }
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Acción"
            value={valores.accion}
            onChange={(e) => handleInputChange("accion", e.target.value)}
            fullWidth
            select
          >
            {acciones.map((accion, index) => (
              <MenuItem key={index} value={accion}>
                {accion}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Valor sin comisión"
            type="number"
            value={valores.valorSinComision}
            onChange={(e) => handleChange("valorSinComision", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Comisión"
            type="number"
            value={valores.comision}
            onChange={(e) => handleChange("comision", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Valor operación"
            type="number"
            value={valores.valorOperacion}
            onChange={(e) => handleChange("valorOperacion", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Cantidad de acciones"
            type="number"
            value={valores.cantidadAcciones}
            onChange={(e) => handleChange("cantidadAcciones", e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default AgregarOperacion;
