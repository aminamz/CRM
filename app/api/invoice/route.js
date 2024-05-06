import { MakeInvoice } from "@/helpers/function";
import { ConnectDatabase, GetRequiredPoint } from "@/helpers/services";
import { Customer } from "@/model/customer/customer";
import { Invoice } from "@/model/invoice/invoice";
import { NextResponse } from "next/server";

export async function POST(req) {
  // checking the Database Connection

  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error While Connecting to Server" },
      { status: 502 }
    );
  }

  const { iid, cid, product, total } = await req.json();

  if (!iid || !cid || !product || !total) {
    return NextResponse.json(
      { status: "Failed", msg: "Invalid Given Data" },
      { status: 406 }
    );
  }
  //validate Product With Total

  const sum = product.reduce(
    (total, current) => (total += current.count * current.price),
    0
  );

  if (sum !== parseInt(total)) {
    return NextResponse.json(
      {
        status: "Failed",
        msg: "Invoice's total is not equal to Products total",
      },
      { status: 422 }
    );
  }

  //Calculating Points

  const requiredPoint = await GetRequiredPoint();

  const points = Math.floor(+total / requiredPoint);

  // Inserting Invoice to DB
  const invoice = await Invoice.create({ iid, cid, product, total });

  if (!invoice) {
    return NextResponse.json(
      { status: "Failed", msg: "Failed To insert Invoice" },
      { status: 502 }
    );
  }

  // Updating Points in Customer
  await Customer.findByIdAndUpdate(
    { _id: cid },
    { $inc: { currentPoint: points } }
  );

  return NextResponse.json(
    { status: "Success", msg: "Create Successfully" },
    { status: 201 }
  );
}

export async function GET() {
  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error While Connecting to Server" },
      { status: 502 }
    );
  }

  try {
    const data = await Invoice.find();

    const invoice = await Promise.all(MakeInvoice(data));

    return NextResponse.json(
      { message: "Success", data: invoice },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Fail", data: err }, { status: 500 });
  }
}
