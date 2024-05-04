import { Schema, model, models } from "mongoose";

const invoiceSchema = new Schema({
  customerId: {
    type: String,
    required: true,
  },
  product: [
    {
      productId: {
        type: String,
        required: true,
      },
      Count: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
});

export const Invoice = models.Invoice || model("Invoice", invoiceSchema);
