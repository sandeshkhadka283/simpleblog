// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://blodnodeproject:khadkasandesh@cluster0.h7fanng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  keywords: [String],
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.get('/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

app.post('/blogs', async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.status(201).json(newBlog);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
