export const createUserValidation = [
  // TODO: completar las validaciones para crear un usuario
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumérico")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ username: username });
      if (usernameExists) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido")
    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw new Error("El email ya está en uso");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "g")
    .withMessage(
      "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número"
    ),
  body("role")
    .optional()
    .isIn(["secretary", "administrator"])
    .withMessage("El rol debe ser 'secretary' o 'administrator'"),
  body("deleted_at")
    .optional()
    .isISO8601()
    .withMessage("La fecha de eliminación debe ser una fecha válida"),
  body("profile.employee_number")
    .notEmpty()
    .withMessage("Debe incluir employee_number")
    .isInt()
    .withMessage("El employee_number debe ser un entero")
    .custom(async (employee_number) => {
      const employeeNumberExists = await UserModel.findOne({ employee_number });
      if (employeeNumberExists) {
        throw new Error("El employee_number ya está en uso");
      }
    }),
  body("profile.first_name")
    .notEmpty()
    .withMessage("FirstName no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El first_name debe tener entre 2 y 50 caracteres")
    .isString()
    .withMessage("debe ser una cadena de caracteres"),
  body("profile.last_name")
    .notEmpty()
    .withMessage("LastName no debe estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El last_name debe tener entre 2 y 50 caracteres")
    .isString()
    .withMessage("debe ser una cadena de caracteres"),
  ,
  body("profile.phone")
    .optional()
    .isInt()
    .withMessage("Debe ser un numero entero"),
];
