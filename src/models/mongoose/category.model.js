import { Schema, model } from "mongoose";
import { AssetModel } from "./asset.model.js";

// TODO: configurar el virtuals para el populate inverso con assets

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA
// Eliminacion en cascada
CategorySchema.pre("findOneAndDelete", async function (next) {
  const category = await this.model.findOne(this.getFilter());
  if (category) {
    await AssetModel.deleteMany({ category: category._id });
  }

  next();
});

export const CategoryModel = model("Category", CategorySchema);
