import React from 'react';
import './Blog.css';

function Blog() {
  const posts = [
    { title: "Post 1", summary: "Summary of the first post." },
    { title: "Post 2", summary: "Summary of the second post." },
    { title: "Post 3", summary: "Summary of the third post." },
  ];

  return (
    <section className="blog">
      <h2>Recent Blog Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Blog;
