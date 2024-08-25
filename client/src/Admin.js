// client/src/Admin.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');

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
      })
      .catch(error => console.error(error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Blog</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Keywords (comma separated):</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Add Blog</button>
      </form>
    </div>
  );
};

export default Admin;
