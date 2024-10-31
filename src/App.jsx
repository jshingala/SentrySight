import React from 'react';
import Header from './Header.jsx';
import Features from './Features.jsx';
import News from './News.jsx';
import Socials from './Socials.jsx';
import Contact from './Contact.jsx'; // Import the Contact component
import Testimonials from './Testimonials.jsx'; // Import the Testimonials component
import './CSS.css';



function App() {
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
        <section className="features">
          <p>Highlight some key features here.</p>
          <h2>Features Section</h2>
        </section>
        
        <section className="cta">
          <h2>Call to Action</h2>
          <p>Encourage users to take action here.</p>
        </section>
        
        <section className="banner">
          <h2>Title</h2>
          <p>Description.</p>
          <div className="divider"></div>
        </section>
        
        <Features />
        <News /> 
        <Testimonials /> {/* Add the Testimonials component */}
        <Contact /> {/* Add the Contact component */}
        <Socials />
      </main>
      <footer className="footer">
        <p>&copy; SentrySight. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
