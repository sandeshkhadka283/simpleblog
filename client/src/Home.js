// client/src/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>
              <h2>{blog.title}</h2>
              <img src={blog.image} alt={blog.title} width="100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
