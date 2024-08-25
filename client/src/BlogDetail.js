// client/src/BlogDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './BlogDetail.module.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return blog ? (
    <div className={styles.container}>
      <h1 className={styles.title}>{blog.title}</h1>
      <div className={styles.imageContainer}>
        <img src={blog.image} alt={blog.title} className={styles.image} />
      </div>
      <p className={styles.description}>{blog.description}</p>
      <p className={styles.keywords}><strong>Keywords:</strong> {blog.keywords.join(', ')}</p>
    </div>
  ) : (
    <p className={styles.loading}>Loading...</p>
  );
};

export default BlogDetail;
