import React, { useState, useEffect } from "react";
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
  TablePagination,
  Typography,
  Card,
} from "@mui/material";
import AgregarOperacion from "../agregar-operacion/AgregarOperacion";
import "./TablaDeComisiones.css";

function TablaDeComisiones() {
  const [openModal, setOpenModal] = useState(false);
  const [operaciones, setOperaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
    <Card className="container">
      <div className="titulo">
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
          <AgregarOperacion
            operaciones={operaciones}
            setOperaciones={setOperaciones}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </Card>
  );
}

export default TablaDeComisiones;
