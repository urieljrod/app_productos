import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Perfil from "./Perfil";
import Productos from "./Productos";
import AgregarProducto from "./AgregarProducto";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Perfil protegido */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* Lista de productos */}
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />

        {/* Agregar producto */}
        <Route
          path="/agregar-producto"
          element={
            <ProtectedRoute>
              <AgregarProducto />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;