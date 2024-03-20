import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Importación de uuid
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import AgregarOperacion from "../agregar-operacion/AgregarOperacion";

function TablaDeComisiones() {
  const [openModal, setOpenModal] = useState(false);
  const [valores, setValores] = useState({
    accion: "",
    valorSinComision: "",
    comision: "",
    valorOperacion: "",
    cantidadAcciones: "",
  });
  const [operaciones, setOperaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (campo, valor) => {
    setValores({ ...valores, [campo]: valor });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaOperacion = { id: uuidv4(), ...valores }; // Generar ID único usando uuid
    const nuevasOperaciones = [...operaciones, nuevaOperacion];
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

  const guardarOperacionesEnLocalStorage = (operaciones) => {
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
  };

  const cargarOperacionesDesdeLocalStorage = () => {
    const operacionesLocalStorage = localStorage.getItem("operaciones");
    if (operacionesLocalStorage) {
      setOperaciones(JSON.parse(operacionesLocalStorage));
    }
  };

  useEffect(() => {
    cargarOperacionesDesdeLocalStorage();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4">Operaciones</Typography>
        <Button variant="contained" onClick={handleOpenModal}>
          Agregar operación
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Acción</TableCell>
              <TableCell>Valor sin comisión</TableCell>
              <TableCell>Comisión</TableCell>
              <TableCell>Valor operación</TableCell>
              <TableCell>Cantidad de acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operaciones
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((operacion, index) => (
                <TableRow key={operacion.id}>
                  <TableCell>{operacion.accion}</TableCell>
                  <TableCell>{operacion.valorSinComision}</TableCell>
                  <TableCell>{operacion.comision}</TableCell>
                  <TableCell>{operacion.valorOperacion}</TableCell>
                  <TableCell>{operacion.cantidadAcciones}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={operaciones.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" id="modal-title">
            Agregar operación
          </Typography>
          <AgregarOperacion valores={valores} handleChange={handleChange} />
          <Button variant="contained" onClick={handleSubmit}>
            Enviar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TablaDeComisiones;
