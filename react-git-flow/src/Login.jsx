import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/loginSchema";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    const resultado = loginSchema.safeParse(formData);

    if (!resultado.success) {
      const nuevosErrores = {};

      resultado.error.errors.forEach((error) => {
        nuevosErrores[error.path[0]] = error.message;
      });

      setErrores(nuevosErrores);
      return;
    }

    setErrores({});

    localStorage.setItem("token", "usuario-autenticado");

    navigate("/perfil");
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={iniciarSesion}>
        <div>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={formData.usuario}
            onChange={handleChange}
          />

          {errores.usuario && (
            <p>{errores.usuario}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />

          {errores.password && (
            <p>{errores.password}</p>
          )}
        </div>

        <button type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;