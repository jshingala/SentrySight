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
        <section className="banner">
          <h2>Your Banner Title</h2>
          <p>This is a sample tagline. Customize it as you wish.</p>
        </section>

        <section className="banner2">
          <h2>Insert picture</h2>
        </section>

        <section className="features">
          <h2>Features Section</h2>
          <p>Highlight some key features here.</p>
        </section>

        <section className="cta">
          <h2>Call to Action</h2>
          <p>Encourage users to take action here.</p>
          <button onClick={openModal}>Open Modal</button>
        </section>

        <Hero /> {/* Hero section */}
        <Features />
        <News />
        <Testimonials />
        <Contact />

        {/* Modal for user feedback */}
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
      </main>

      <footer className="footer">
        <p>&copy; SentrySight. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
