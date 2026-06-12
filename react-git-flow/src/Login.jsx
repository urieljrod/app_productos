import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const iniciarSesion = () => {
    localStorage.setItem("token", "usuario-autenticado");
    navigate("/perfil");
  };

  return (
    <div>
      <h1>Login</h1>

      <button onClick={iniciarSesion}>
        Iniciar Sesión
      </button>
    </div>
  );
}

export default Login;