import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongodb";
import Users from "../../../../../lib/Model/userSchema";

export async function POST(request, content) {
  await connectMongoDB();
  let data = await request.json();
  let checkuser = await Users.findOne({ email: data.email });
  console.log(checkuser);
  if (checkuser != null) {
    if (checkuser.password == data.password) {
      return NextResponse.json(
        {
          message: "User Login",
          data: checkuser
        },
        {
          status: 200
        }
      );
    }
    else{
        return NextResponse.json({
            message : "Incorrect Password",
            data : []
        })
    }
  } else {
    return NextResponse.json({
      message: "Not Found User",
      data: []
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Api check",
    data: []
  });
}
