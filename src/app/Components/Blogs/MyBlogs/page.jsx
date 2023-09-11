"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  let [res, setres] = useState({
    title: "",
    description: "",
    imagelink: "",
    userid: localStorage.getItem("user_id")
  });
  const [myBlogs, setmyBlogs] = useState([]);
  let [showadd, setShowadd] = useState(false);
  let [editBlog, setEditBlog] = useState(false);
  let [blogId, setBlogId] = useState("");

  useEffect(() => {
    let userid = localStorage.getItem("user_id");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/blogs/myblogs/${userid}`,
      headers: {}
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        setmyBlogs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showadd]);

  //Get Blogs
  const getAllBlogs = () => {
    let userid = localStorage.getItem("user_id");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/blogs/myblogs/${userid}`,
      headers: {}
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        setmyBlogs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Submit New Blogs
  const handleSubmit = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/blogs/myblogs",
      headers: {
        "Content-Type": "application/json"
      },
      data: res
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        setres({ title: "", description: "", imagelink: "", userid: "" });
        setShowadd(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    console.log(e);
    setres({ ...res, [e.target.name]: e.target.value });
  };

  const editBlogValue = (val) => {
    setBlogId(val._id);
    console.log(val);
    setres({
      title: val.title,
      description: val.description,
      imagelink: val.imagelink
    });
    setShowadd(true);
    setEditBlog(true);
  };

  //Edit Add New Blogs
  const editData = () => {
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/blogs/allblogs/${blogId}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: res
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          getAllBlogs();
          setShowadd(false);
          setEditBlog(false);
          setres({ title: "", description: "", imagelink: "", userid: "" });
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = (blogId) =>{
    try{
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/blogs/allblogs/${blogId}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(response.data.message)
        getAllBlogs()
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <>
      {showadd ? (
        <>
          <h1 className="text-center my-8 text-5xl font-bold text-teal-950">
            ADD/EDIT BLOG
          </h1>
          <div className="flex justify-center my-8 ">
            <div className="px-8 py-10 bg-white w-2/3 h-auto shadow-lg rounded-md">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                value={res.title}
                placeholder="Enter Blog Title"
                name="title"
                className="px-4 py-2 w-full mb-4 rounded-sm border border-teal-950"
              />
              <br />
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                value={res.imagelink}
                placeholder="Enter Image URL"
                name="imagelink"
                className="px-4 py-2 w-full mb-4 rounded-sm border border-teal-950"
              />
              <br />
              <textarea
                type="text"
                name="description"
                onChange={(e) => handleChange(e)}
                value={res.description}
                placeholder="What is in Your Mind!!"
                className="px-4 py-2 w-full h-48 rounded-sm border border-teal-950"
              />
              {editBlog ? (
                <button
                  onClick={() => editData()}
                  className="w-40 bg-teal-950 text-white my-4 me-4 h-10 rounded-sm"
                >
                  UPDATE
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit()}
                  className="w-40 bg-teal-950 text-white my-4 me-4 h-10 rounded-sm"
                >
                  SUBMIT
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-100 h-fit">
          <div className="flex justify-between items-center bg-white text-2xl font-bold px-8 py-6">
            <h1>DASHBOARD</h1>
            <button onClick={() => setShowadd(true)} className="text-teal-950">
              ADD BLOG
            </button>
          </div>
          <div>
            <h1 className="text-4xl font-bold mx-auto text-center my-10 ">
              MY BLOGS
            </h1>

            {myBlogs?.map((v, i) => {
              return (
                <div className="bg-white w-2/3 mx-auto my-10 shadow-md rounded-md">
                  <div className="flex flex-row">
                    <img
                      src={v.imagelink}
                      className="w-20 h-20 m-4 rounded-md"
                    />
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
                  {/* <b>{v.userid}</b> */}
                  <button
                    onClick={() => editBlogValue(v)}
                    className="w-20 bg-teal-950 h-10 mx-4 mb-4 text-white rounded-sm"
                  >
                    EDIT
                  </button>
                  <button
                  onClick={()=> deleteData(v._id)} 
                  className="w-24 bg-teal-700 h-10 mx-2 mb-4 text-white rounded-sm">
                    DELETE
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
