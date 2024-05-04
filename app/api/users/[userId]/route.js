import { User } from "@/model/user/user";
import { Connect } from "@/utils/db/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(req, { params: { userId } }) {
  if (!(await ConnectDatabase())) {
    return NextResponse.json(
      { status: "Failed", msg: "Error in Connecting" },
      { status: 500 }
    );
  }

  try {
    const data = await User.find({ username: userId });
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Fail to retrieve Data", data: [] },
      { status: 419 }
    );
  }
}
