// client/src/BlogDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return blog ? (
    <div>
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.description}</p>
      <p><strong>Keywords:</strong> {blog.keywords.join(', ')}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default BlogDetail;
