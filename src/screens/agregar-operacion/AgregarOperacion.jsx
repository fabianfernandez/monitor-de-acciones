import React, { useState, useEffect } from "react";
import { TextField, Grid, Autocomplete, Button, Typography } from "@mui/material";
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
  const [errors, setErrors] = useState({
    accion: false,
    valorSinComision: false,
    comision: false,
    valorOperacion: false,
    cantidadAcciones: false,
  });

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

  useEffect(() => {
    if (valores.valorOperacion !== "" && valores.comision !== "") {
      const valorSinComision = parseFloat(valores.valorOperacion) - parseFloat(valores.comision);
      setValores((prevState) => ({
        ...prevState,
        valorSinComision: valorSinComision.toString(),
      }));
    }
  }, [valores.valorOperacion, valores.comision]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !valores.accion ||
      !valores.valorSinComision ||
      !valores.comision ||
      !valores.valorOperacion ||
      !valores.cantidadAcciones
    ) {
      setErrors({
        ...errors,
        accion: !valores.accion,
        valorSinComision: !valores.valorSinComision,
        comision: !valores.comision,
        valorOperacion: !valores.valorOperacion,
        cantidadAcciones: !valores.cantidadAcciones,
      });
      return;
    }
    const nuevaOperacion = { id: uuidv4(), ...valores }; // Generar ID único usando uuid
    const nuevasOperaciones = [...operaciones, nuevaOperacion];
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
    setValores({ ...valores, [campo]: valor });
    setErrors({ ...errors, [campo]: false });
  };

  const guardarOperacionesEnLocalStorage = (operaciones) => {
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <TextField
                {...params}
                label="Acción"
                fullWidth
                error={errors.accion}
                helperText={errors.accion && "Este campo es obligatorio"}
                required
              />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Valor sin comisión"
            type="number"
            disabled
            value={valores.valorSinComision}
            onChange={(e) => handleChange("valorSinComision", e.target.value)}
            fullWidth
            error={errors.valorSinComision}
            helperText={errors.valorSinComision && "Este campo es obligatorio"}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Comisión"
            type="number"
            value={valores.comision}
            onChange={(e) => handleChange("comision", e.target.value)}
            fullWidth
            error={errors.comision}
            helperText={errors.comision && "Este campo es obligatorio"}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Valor operación"
            type="number"
            value={valores.valorOperacion}
            onChange={(e) => handleChange("valorOperacion", e.target.value)}
            fullWidth
            error={errors.valorOperacion}
            helperText={errors.valorOperacion && "Este campo es obligatorio"}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Cantidad de acciones"
            type="number"
            value={valores.cantidadAcciones}
            onChange={(e) => handleChange("cantidadAcciones", e.target.value)}
            fullWidth
            error={errors.cantidadAcciones}
            helperText={errors.cantidadAcciones && "Este campo es obligatorio"}
            required
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AgregarOperacion;
