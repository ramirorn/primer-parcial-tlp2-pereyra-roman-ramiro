import { CategoryModel } from "../../models/mongoose/category.model.js";

export const createCategoryValidation = [
  // TODO: completar las validaciones para crear una categoria
  body("name")
  .notEmpty()
  .withMessage("El name debe ser incluido")
  .isLength({min:3,max:100})
  .custom(async (name) => {
        const nameExists = await CategoryModel.findOne({ name: name });
        if (nameExists) {
          throw new Error("El nombre ya está en uso");
        }
      }),
  body("description")
  .optional()
  .isLength({max: 500})
  .withMessage("La description no debe exceder los 500 caracteres"),
];
