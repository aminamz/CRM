import { User, user } from "@/model/user/user";
import { Connect } from "@/utils/db/ConnectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Connecting To Database
  try {
    await Connect();
  } catch {
    return NextResponse.json(
      { status: "Failed", msg: "Failed to connect to Server" },
      { status: 500 }
    );
  }
  //   Getting Data From Request
  const { username, password } = await req.json();

  //   Validating Request Data for Not Being Empty
  if (!username || !password)
    return NextResponse.json(
      { status: "Failed", msg: "مقادیر وارد شده صحیح نمیباشد" },
      { status: 406 }
    );

  // Checking User For Existance
  const user = await User.findOne({ username: username });
  console.log(user);
  if (!user)
    return NextResponse.json(
      { status: "Failed", msg: "کاربر یافت نشد" },
      { status: 404 }
    );

  // Checking user Password To Eqaul
  if (user.password === password) {
    return NextResponse.json({ status: "Success" }, { status: 201 });
  } else {
    return NextResponse.json(
      { status: "Failed", msg: "کلمه عبور اشتباه است" },
      { status: 422 }
    );
  }
}
