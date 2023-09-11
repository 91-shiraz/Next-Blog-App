import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../lib/mongodb";
import Blogs from "../../../../../../lib/Model/blogSchema";

export async function GET(request, content) {
  console.log(content.params.blogsid);

  await connectMongoDB();

  let checkuser = await Blogs.find({ userid: content.params.blogsid });

  console.log(checkuser);

  if (checkuser != null) {
    return NextResponse.json({
      data: checkuser,
      message: "Get Your Response!!"
    });
  } else {
    return NextResponse.json({
      data: [],
      message: "Not Add Any Blogs"
    });
  }
}
