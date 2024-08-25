import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing blogs
    axios.get('http://localhost:5000/blogs')
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/blogs', {
      title,
      image,
      description,
      keywords: keywords.split(',').map(keyword => keyword.trim()),
    })
      .then(response => {
        alert('Blog added successfully!');
        setTitle('');
        setImage('');
        setDescription('');
        setKeywords('');
        setBlogs([...blogs, response.data]);
      })
      .catch(error => console.error('Error adding blog:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/blogs/${id}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id));
        alert('Blog deleted successfully!');
      })
      .catch(error => console.error('Error deleting blog:', error));
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
    // You might want to show a modal or redirect to an edit page
    alert(`Edit functionality for blog ${id} is not implemented yet.`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.gridContainer}>

      <div className={styles.blogList}>
          <h2>Existing Blogs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className={styles.blogListContainer}>
              {blogs.map((blog, index) => (
                <li key={blog._id} className={styles.blogItem}>
                  <div className={styles.blogNumber}>#{index + 1}</div>
                  <div className={styles.blogContent}>
                    <h3 className={styles.blogTitle}>{blog.title}</h3>
                    <p className={styles.blogDescription}>{blog.description.substring(0, 100)}...</p>
                    <p className={styles.blogDate}>Date Added: {new Date(blog.createdAt).toLocaleDateString()}</p>
                    <div className={styles.blogActions}>
                      <button onClick={() => handleEdit(blog._id)} className={styles.editButton}>Edit</button>
                      <button onClick={() => handleDelete(blog._id)} className={styles.deleteButton}>Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.formContainer}>
          <h2>Add New Blog</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Image URL:</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className={styles.textarea} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Keywords (comma separated):</label>
              <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} required className={styles.input} />
            </div>
            <button type="submit" className={styles.submitButton}>Add Blog</button>
          </form>
        </div>

       
      </div>
    </div>
  );
};

export default Admin;
