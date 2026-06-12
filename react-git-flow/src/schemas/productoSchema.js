import { z } from "zod";

export const productoSchema = z.object({
  nombre: z
    .string()
    .min(3, "Nombre muy corto"),

  precio: z
    .number({
      invalid_type_error:
        "Precio inválido",
    })
    .positive(),

  stock: z
    .number({
      invalid_type_error:
        "Stock inválido",
    })
    .nonnegative(),

  categoria: z
    .string()
    .min(3, "Categoría inválida"),
});