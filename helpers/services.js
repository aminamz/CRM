import { Product } from "@/model/product/product";

const { Connect } = require("@/utils/db/ConnectDB");

export async function ConnectDatabase() {
  let isSucces;
  try {
    await Connect();
    isSucces = true;
  } catch {
    isSucces = false;
  }
  return isSucces;
}

export async function GetRequiredPoint() {
  return 50_000;
}

export async function getProduct() {
  // if(!(await ConnectDatabase())){
  //   return;
  // }

  // const product = await Product.find();
  // return product ;

  if (await ConnectDatabase()) {
    const product = await Product.find();
    return;
  }
}
