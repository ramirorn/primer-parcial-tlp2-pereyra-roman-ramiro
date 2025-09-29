import { matchedData } from "express-validator";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { signToken, verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/sequelize/user.model.js";

export const register = async (req, res) => {
  try {
    // TODO: crear usuario con password hasheada y profile embebido
    const data = matchedData(req);

    const hashedPassword = await hashPassword(data.password);

    const user = await UserModel.create({
      username: data.username,
      email: data.username,
      password: hashedPassword,
      role: data.role,
      profile: {
        employee_number: data.employee_number,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });

    return res.status(201).json({
      ok: true,
      msg: "Usuario registrado correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    const user = await UserModel.findOne({ username });
    if (!user)
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch)
      return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });

    const token = signToken(user)

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    const usuarioLogueado = req.user;

    const profile = await UserModel.findOne({_id: usuarioLogueado.id}).select(
      "-password"
    )


    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
