import { ConnectDatabase } from "@/helpers/services";
import { Customer } from "@/model/customer/customer";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Connecting DataBase

  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error in Connecting" },
      { status: 502 }
    );
  }

  const { cid, firstName, lastName, phone, address } = await req.json();

  //   validating body props

  if (!cid || !lastName || !firstName || !phone || !address) {
    return NextResponse.json(
      { status: "Failed", msg: "invalid Given Data" },
      { status: 406 }
    );
  }

  // Commiunicate with DataBase
  const newCustomer = await Customer.create({
    cid,
    firstName,
    lastName,
    phone,
    address,
  });
  console.log(newCustomer);

  //Checking the Result
  if (!newCustomer) {
    return NextResponse.json(
      { status: "Failed", msg: "Error While Commiunicate With Server" },
      { status: 502 }
    );
  }

  return NextResponse.json(
    { status: "Success", data: newCustomer },
    { status: 201 }
  );
}

export async function GET() {
  // Connecting DataBase

  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error in Connecting" },
      { status: 502 }
    );
  }

  // Get All Data
  const customers = await Customer.find();

  return NextResponse.json(customers, { status: 200 });
}
