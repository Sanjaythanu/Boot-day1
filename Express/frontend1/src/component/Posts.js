

import React, { useEffect, useState } from "react";
import axios from "axios";

// Express API URL
const API_URL = "http://localhost:5000/posts";

function Posts() {
  // state for posts
  const [posts, setPosts] = useState([]);

  // fetch data from Express API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>React JS + Express JS + JSON CRUD Operation</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Posts;
