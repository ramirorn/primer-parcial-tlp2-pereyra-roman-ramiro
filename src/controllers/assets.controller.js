import { matchedData } from "express-validator";
import { AssetModel} from "../models/mongoose/asset.model.js"

export const createAsset = async (req, res) => {
  try {
    const data = matchedData(req)
    // TODO: crear asset (usuario autenticado)
    const asset = await AssetModel.create(data)
    return res.status(201).json({ msg: "Asset creado correctamente", data: asset });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    const assets = await AssetModel.find().populate("responsible").populate("categories")
    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    const usuarioLoguado = req.user;
    const myAssets = await AssetModel.find({responsible: usuarioLoguado.id}).populate("categories")
    if (myAssets.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No se encontraron Assets en la base de datos"
      })
    }
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
