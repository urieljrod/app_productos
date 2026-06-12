import { useNavigate } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const obtenerDatos = async () => {
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

      const datos = await respuesta.json();

      console.log(datos);
      alert(datos.mensaje);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al obtener los datos");
    }
  };

  return (
    <div>
      <h1>Perfil del Usuario</h1>

      <p>
        Esta es una ruta protegida.
      </p>

      <button onClick={obtenerDatos}>
        Obtener Datos Protegidos
      </button>

      <br />
      <br />

      <button onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Perfil;