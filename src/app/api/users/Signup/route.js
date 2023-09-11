import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongodb";
import Users from "../../../../../lib/Model/userSchema";

export async function POST(request, content) {
  await connectMongoDB();
  let data = await request.json();
  let checkuser = await Users.findOne({ email: data.email });
  console.log(checkuser);
  if (checkuser != null) {
    return NextResponse.json(
      {
        message: "Already Regsister",
        data: checkuser
      },
      {
        status: 200
      }
    );
  } else {
    let res = Users(data);
    await res.save();
    return NextResponse.json({
      message: "User Regsister",
      data: res
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Api check",
    data: []
  });
}
