import { useState } from "react";
import { productoSchema } from "../schemas/productoSchema";

function AgregarProducto() {
  const [errores, setErrores] = useState({});

  const [formData, setFormData] =
    useState({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const guardarProducto =
    async (e) => {
      e.preventDefault();

      const resultado =
        productoSchema.safeParse({
          ...formData,
          precio:
            Number(formData.precio),
          stock:
            Number(formData.stock),
        });

      if (!resultado.success) {
        const nuevosErrores = {};

        resultado.error.issues.forEach(
          (error) => {
            nuevosErrores[
              error.path[0]
            ] = error.message;
          }
        );

        setErrores(nuevosErrores);

        return;
      }

      setErrores({});

      await fetch(
        "http://localhost:5000/productos",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            resultado.data
          ),
        }
      );

      alert(
        "Producto agregado"
      );
    };

  return (
    <form
      onSubmit={guardarProducto}
    >
      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
      />
      <p>{errores.nombre}</p>

      <input
        name="precio"
        placeholder="Precio"
        onChange={handleChange}
      />
      <p>{errores.precio}</p>

      <input
        name="stock"
        placeholder="Stock"
        onChange={handleChange}
      />
      <p>{errores.stock}</p>

      <input
        name="categoria"
        placeholder="Categoría"
        onChange={handleChange}
      />
      <p>{errores.categoria}</p>

      <button type="submit">
        Guardar Producto
      </button>
    </form>
  );
}

export default AgregarProducto;