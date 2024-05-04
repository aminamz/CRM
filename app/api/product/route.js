import { ConnectDatabase } from "@/helpers/services";
import { Product } from "@/model/product/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Connecting to Database Server

  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error in Connecting" },
      { status: 502 }
    );
  }

  //   validating The Body Props

  const { pid, name, price } = await req.json();

  if (!pid || !name || !price) {
    return NextResponse.json(
      { status: "Failed", msg: "Invalid Given data" },
      { status: 406 }
    );
  }

  // Creating model or adding Data to Current Model

  const newProduct = await Product.create({
    pid,
    name,
    price,
  });

  if (!newProduct) {
    return NextResponse.json(
      { status: "Failed", msg: "Error In Submitting Data" },
      { status: 502 }
    );
  }

  return NextResponse.json(
    { status: "Success", data: newProduct },
    { status: 201 }
  );
}
export async function GET() {
  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error in Connecting" },
      { status: 502 }
    );
  }

  const product = await Product.find();

  return NextResponse.json(product, { status: 200 });
}
