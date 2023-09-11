import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongodb";
import Blogs from "../../../../../lib/Model/blogSchema";

export async function GET(){
    await connectMongoDB();

    let res= await Blogs.find({})
    return NextResponse.json({
        data : res,
        message: "Get All Blogs!!"
    })
}