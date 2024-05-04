import { ConnectDatabase } from "@/helpers/services";
import { User } from "@/model/user/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error in Connecting" },
      { status: 502 }
    );
  }
  const { username, password } = await request.json();
  console.log(username.length, password.length);
  if (username.length < 3 || password.length < 8)
    return NextResponse.json({ message: "data Not Admited" }, { status: 419 });
  try {
    const newUser = new User({
      username: username,
      password: password,
    });
    await newUser.save();

    return NextResponse.json(
      { message: "Data Inserted Successfully", data: { newUser } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error, data: {} }, { status: 500 });
  }
}

export async function GET() {
  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error in Connecting" },
      { status: 502 }
    );
  }

  try {
    const data = await User.find();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Fail", data: err }, { status: 500 });
  }
}
