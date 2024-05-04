import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
  cid: {
    type: String,
    required: true,
    minlength: 3,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
    length: 11,
  },
  address: {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
});

export const Customer = models.Customer || model("Customer", customerSchema);
