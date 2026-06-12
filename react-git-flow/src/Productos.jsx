import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

function Productos() {
  const [productos, setProductos] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  const cargarProductos =
    useCallback(async () => {
      try {
        const respuesta =
          await fetch(
            "http://localhost:5000/productos"
          );

        const datos =
          await respuesta.json();

        setProductos(datos);
      } catch (error) {
        console.error(
          "Error al cargar productos:",
          error
        );
      }
    }, []);

  useEffect(() => {
  const obtenerDatos = async () => {
    await cargarProductos();
  };

  obtenerDatos();
}, [cargarProductos]);

  const eliminarProducto =
    useCallback(
      async (id) => {
        try {
          await fetch(
            `http://localhost:5000/productos/${id}`,
            {
              method: "DELETE",
            }
          );

          cargarProductos();
        } catch (error) {
          console.error(
            "Error al eliminar producto:",
            error
          );
        }
      },
      [cargarProductos]
    );

  const productosFiltrados =
    useMemo(() => {
      return productos.filter(
        (producto) =>
          producto.nombre
            .toLowerCase()
            .includes(
              busqueda.toLowerCase()
            )
      );
    }, [
      productos,
      busqueda,
    ]);

  return (
    <div>
      <h1>Frutería Online</h1>

      <input
        type="text"
        placeholder="Buscar fruta"
        value={busqueda}
        onChange={(e) =>
          setBusqueda(
            e.target.value
          )
        }
      />

      {productosFiltrados.map(
        (producto) => (
          <div key={producto._id}>
            <h3>
              {producto.nombre}
            </h3>

            <p>
              Precio: $
              {producto.precio}
            </p>

            <p>
              Stock:
              {" "}
              {producto.stock}
            </p>

            <p>
              Categoría:
              {" "}
              {producto.categoria}
            </p>

            <button
              onClick={() =>
                eliminarProducto(
                  producto._id
                )
              }
            >
              Eliminar
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Productos;