// src/App.jsx
import React, { useState } from 'react';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import FAQ from './FAQ.jsx';
import Blog from './Blog.jsx';
import Features from './Features.jsx';
import News from './News.jsx';
import Socials from './Socials.jsx';
import Testimonials from './Testimonials.jsx';
import Contact from './Contact.jsx';
import Modal from './Modal.jsx';
import './CSS.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const submitFeedback = (event) => {
    event.preventDefault();
    alert(`Feedback submitted: ${feedback}`);
    setFeedback(''); // Clear feedback after submission
    closeModal(); // Close modal after submitting
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <section id="home" className="banner">
          <h2>Your Banner Title</h2>
          <p>This is a sample tagline. Customize it as you wish.</p>
        </section>

        <section id="about" className="banner2">
          <h2>About Us</h2>
        </section>

        <section id="demo" className="features">
          <h2>Demo Section</h2>
          <p>Highlight some demo features here.</p>
        </section>

        <section id="questionnaire" className="cta">
          <h2>Questionnaire</h2>
          <p>Encourage users to take the questionnaire here.</p>
        </section>

        <section id="sign-up" className="features">
          <h2>Sign Up / Register</h2>
          <p>Encourage users to sign up here.</p>
          <button onClick={openModal}>Open Modal</button>
        </section>

        <Hero />
        <Features />
        <News />
        <Testimonials />
        <Contact />

        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          content={
            <form onSubmit={submitFeedback}>
              <h3>Submit Your Feedback</h3>
              <textarea 
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Write your feedback here..."
                required
              />
              <button type="submit">Submit</button>
            </form>
          }
        />
        
        <Socials />
      </main>

      <footer className="footer">
        <p>&copy; SentrySight. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
