// client/src/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog List</h1>
      <ul className={styles.blogList}>
        {blogs.map(blog => (
          <li key={blog._id} className={styles.blogItem}>
            <Link to={`/blogs/${blog._id}`} className={styles.blogLink}>
              <h2 className={styles.blogTitle}>{blog.title}</h2>
              <p className={styles.blogDescription}>{blog.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
