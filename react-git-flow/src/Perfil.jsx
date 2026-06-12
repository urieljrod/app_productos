import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";

function Perfil() {
  const navigate = useNavigate();

  const mensajeBienvenida = useMemo(() => {
    return "Bienvenido a la sección protegida";
  }, []);

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const obtenerDatos = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const respuesta = await fetch(
        "http://localhost:5000/perfil",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo acceder al recurso");
      }

      const datos = await respuesta.json();

      alert(datos.mensaje);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <div>
      <h1>Perfil del Usuario</h1>

      <p>{mensajeBienvenida}</p>

      <button onClick={obtenerDatos}>
        Obtener Datos Protegidos
      </button>

      <button onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Perfil;