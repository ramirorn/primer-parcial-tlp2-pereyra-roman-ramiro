import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { type: Date, default: null },
    profile: {
      employee_number: {
        type: String,
        required: true,
      },
      first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      phone: {
        type: String,
        required: false,
      }
    },
    deletedAt: {
      type: Date,
      default: null,
      required: false,
    }
    // ! FALTA COMPLETAR ACA
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA

// Populate inverso (virtual)
UserSchema.virtual("Assets", {
  ref: "Asset",
  localField: "_id",
  foreignField: "responsible",
  justOne: false,
})

// Convertir un documento a JSON y que incluya las virtuals (como Assets) en la salida.
UserSchema.set("toJSON", { virtuals: true });
export const UserModel = model("User", UserSchema);
