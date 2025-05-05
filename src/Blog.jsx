import React from 'react';
import './blog.css';

const Blog = () => {
  const posts = [
    { title: "Post 1", summary: "Summary of the first post." },
    { title: "Post 2", summary: "Summary of the second post." },
    { title: "Post 3", summary: "Summary of the third post." },
  ];

  return (
    <section className="blog">
      <header className="blog-header">
        <h2>Recent Blog Posts</h2>
      </header>
      <div className="blog-posts">
        {posts.map((post, index) => (
          <article key={index} className="blog-post">
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;