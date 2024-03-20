import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // Importación de uuid

function AgregarOperacion({ operaciones, setOperaciones, handleCloseModal }) {
  const [acciones, setAcciones] = useState([]);
  const [valores, setValores] = useState({
    accion: "",
    valorSinComision: "",
    comision: "",
    valorOperacion: "",
    cantidadAcciones: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaOperacion = { id: uuidv4(), ...valores }; // Generar ID único usando uuid
    const nuevasOperaciones = [...operaciones, nuevaOperacion];
    console.log("valores: ", valores);
    if (!acciones.includes(valores.accion)) {
      const nuevaAccion = valores.accion;
      const nuevasAcciones = [...acciones, nuevaAccion];
      guardarAccionesEnLocalStorage(nuevasAcciones);
    }
    setOperaciones(nuevasOperaciones);
    guardarOperacionesEnLocalStorage(nuevasOperaciones);
    setValores({
      accion: "",
      valorSinComision: "",
      comision: "",
      valorOperacion: "",
      cantidadAcciones: "",
    });
    handleCloseModal();
  };

  const handleChange = (campo, valor) => {
    console.log("handleCahnge: ", {
      campo,
      valor,
    });
    setValores({ ...valores, [campo]: valor });
  };

  const guardarOperacionesEnLocalStorage = (operaciones) => {
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
  };
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

  return (
    <form>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h5" id="modal-title">
            Agregar operación
          </Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            options={acciones}
            freeSolo
            value={valores.accion}
            onInputChange={(_, value) => handleChange("accion", value)}
            renderInput={(params) => (
              <TextField {...params} label="Acción" fullWidth />
            )}
          />
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
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AgregarOperacion;
