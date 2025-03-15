import { motion } from 'framer-motion';
import React from 'react';
import './global.css';

function Blog() {
  const posts = [
    { title: "Post 1", summary: "Summary of the first post." },
    { title: "Post 2", summary: "Summary of the second post." },
    { title: "Post 3", summary: "Summary of the third post." },
  ];

  const styles = {
    blogSection: {
      padding: '60px',
      maxWidth: '1100px',
      margin: '50px auto',
    },
    heading: {
      fontSize: '2.5rem',
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      marginBottom: '40px',
    },
    postList: {
      listStyle: 'none',
      padding: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '30px',
    },
    postItem: {
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: '#333333',
    },
    postTitle: {
      fontSize: '1.8rem',
      color: '#d084f3',
      marginBottom: '15px',
    },
    postSummary: {
      fontSize: '1.1rem',
      color: '#bfbfbf',
    }
  };

  return (
    <section style={styles.blogSection}>
      <motion.h2
        style={styles.heading}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Recent Blog Posts
      </motion.h2>
      <motion.ul
        style={styles.postList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {posts.map((post, index) => (
          <motion.li
            key={index}
            className="card"
            style={styles.postItem}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            whileHover={{ 
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 25px rgba(0, 0, 0, 0.35)'
            }}
          >
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postSummary}>{post.summary}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

export default Blog;