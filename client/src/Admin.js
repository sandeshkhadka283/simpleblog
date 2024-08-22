// client/src/Admin.js
import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Add New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Keywords (comma separated):</label>
          <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} required />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default Admin;
