"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  let [allBlogs, setAllblogs] = useState([]);
  let [search, setSearch]=useState("");

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/blogs/allblogs",
      headers: {}
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // console.log(response.data.data);
        setAllblogs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/blogs/allblogs/${search}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setAllblogs(response.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  },[search])


  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold">Good Morning Readers!!</h1>
        <Link href={"/Components/Blogs/MyBlogs"}><h2 className="my-4 text-2xl text-teal-950">MY BLOGS</h2></Link>
        <div className="text-center my-10">
        <input type="text" placeholder="Search Blogs...." className="px-4 h-12 w-1/2 rounded-sm shadow-sm " value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button className="bg-teal-950 text-white mx-2 rounded-sm h-12 w-32 text-xl tracking-wide">Search</button>
        </div>
        <p className="my-12 text-5xl font-bold text-teal-950 text-center">
          ALL BLOGS
        </p>
        <div>
          {allBlogs?.map((v, i) => {
            return (
              <div className="bg-white w-2/3 mx-auto my-10 shadow-md rounded-md">
                <div className="flex flex-row">
                  <img src={v.imagelink} className="w-20 h-20 m-4 rounded-md" />
                  <h1 className="text-2xl mt-6 font-bold me-2">{v.title}</h1>
                </div>
                {v.description != null ? (
                  <>
                    <p className="mx-4">{v.description}</p>
                    <br />
                  </>
                ) : (
                  <b></b>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
