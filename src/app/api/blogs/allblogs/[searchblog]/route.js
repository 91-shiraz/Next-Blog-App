import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../lib/mongodb";
import Blogs from "../../../../../../lib/Model/blogSchema";

export async function GET(request, content) {
  await connectMongoDB();

  console.log(content.params.searchblog);

  let res = await Blogs.find({});

  let mainBlog = [];

  for (let i = 0; i < res.length; i++) {
    if (res[i]["title"].toLowerCase().includes(content.params.searchblog)) {
      mainBlog.push(res[i]);
    }
    if (
      res[i]["description"].toLowerCase().includes(content.params.searchblog)
    ) {
      mainBlog.push(res[i]);
    }
  }

  if (mainBlog.length > 0) {
    return NextResponse.json({
      data: mainBlog,
      message: "Get Specific Blogs!!"
    });
  } else {
    return NextResponse.json({
      data: mainBlog,
      message: "No Any Blog!!"
    });
  }
}

export async function PUT(request, content) {
  await connectMongoDB();
  try {
    let blogid = content.params.searchblog;
    let data = await request.json();

    let updateBlog = await Blogs.findByIdAndUpdate(blogid, data, {
      new: true
    });

    if (updateBlog) {
      return NextResponse.json({
        data: updateBlog,
        message: "Blog Data Update!!"
      });
    }
    else{
        return NextResponse.json({
            message : "Blog Data Not Update!!"
        })
    }
  } catch (e) {
    console.log(e);
  }
}


export async function DELETE(request, content){
  await connectMongoDB();
  try {
    let blogid = content.params.searchblog;
    let record ={_id: blogid}
    let deleteBlog = await Blogs.deleteOne(record);

    if (deleteBlog) {
      return NextResponse.json({
        deleteBlog,
        message: "Blog Delete!!"
      });
    }
    else{
        return NextResponse.json({
            message : "Blog Data Not Update!!"
        })
    }
  } catch (e) {
    console.log(e);
  }
}