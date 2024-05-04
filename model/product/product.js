import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  pid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = models.Product || model("Product", productSchema);
