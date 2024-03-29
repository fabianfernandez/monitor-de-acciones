import TablaDeComisiones from "./screens/tabla-de-comisiones/TablaDeComisiones";
import TablaDePesoPortafolio from "./screens/tabla-de-peso-portafolio/TablaDePesoPortafolio";
import "./App.css";
import GraficoPortafolio from "./screens/grafico-portafolio/GraficoPortafolio";
import Valorizador from "./screens/valorizador/Valorizador";
function App() {
  return (
    <div className="main">
      <TablaDeComisiones />
      <TablaDePesoPortafolio />
      <GraficoPortafolio />
      <Valorizador />
    </div>
  );
}

export default App;
