import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import Demo from './Demo.jsx'; // Import Demo page
import Login from './login';
import Register from './register'
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
    setFeedback(''); 
    closeModal();
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
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
                </>
              } 
            />
            <Route path="/demo" element={<Demo />} /> {/* Route to Demo */}
            <Route path="/login" element={<Login />} /> {/* Route to Demo */}
            <Route path="/register" element={<Register />} /> {/* Route to Sign Up*/}
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; SentrySight. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
