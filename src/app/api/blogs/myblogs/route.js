import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongodb";
import Blogs from "../../../../../lib/Model/blogSchema";

export async function POST(request, content) {
  await connectMongoDB();
  let datas = await request.json();
  if (!datas.title || !datas.imagelink) {
    return NextResponse.json({
      message: "Missing Required Field"
    });
  } else {
    let blog = new Blogs(datas);
    const res = await blog.save();
    return NextResponse.json({
      message: "New Blog Add",
      data: res
    });
  }
}

export async function GET(request, content) {
  await connectMongoDB();
  try {
    let data = await Blogs.find();
    return NextResponse.json({
      status: 200,
      data: data,
      success: true,
      message: "Data Send"
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "Data Not Send"
    });
  }
}
