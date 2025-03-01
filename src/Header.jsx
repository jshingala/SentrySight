import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // FontAwesome icons
import "./global.css";
import "./header.css";
import Logo from "./assets/Logo.png";

function Header({ userEmail }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHomeClick = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-container" onClick={handleHomeClick} style={{ cursor: "pointer" }}>
        <img src={Logo} alt="SentrySight Logo" className="logo" />
      </div>


      {isMobile ? (
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
      ) : (
        <nav className="nav-links">
          <NavLink to="/about" activeclassname="active">About</NavLink>
          <NavLink to="/demo" activeclassname="active">Demo</NavLink>
          <NavLink to="/questionnaire" activeclassname="active">Questionnaire</NavLink>
          <NavLink to="/pricing" activeclassname="active">Pricing</NavLink>
          <NavLink to="/contact" activeclassname="active">Contact</NavLink>
          {userEmail ? (
            <NavLink to="/profile" activeclassname="active">Profile</NavLink>
          ) : (
            <NavLink to="/sign-in" activeclassname="active">Sign In</NavLink>
          )}
        </nav>
      )}

      {menuOpen && isMobile && (
        <div className="dropdown-menu">
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/demo" onClick={() => setMenuOpen(false)}>Demo</NavLink>
          <NavLink to="/questionnaire" onClick={() => setMenuOpen(false)}>Questionnaire</NavLink>
          <NavLink to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {userEmail ? (
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
          ) : (
            <NavLink to="/sign-in" onClick={() => setMenuOpen(false)}>Sign In</NavLink>
          )}
        </div>
      )}

      <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5 }}
          >
            <div className="back-arrow" onClick={toggleMenu}>
              &#8592; {/* Left arrow symbol */}
            </div>
            <ul className="nav-list">
              <li className="nav-item"><Link className="nav-link" to="/about" onClick={toggleMenu}>About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/demo" onClick={toggleMenu}>Demo</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/pricing" onClick={toggleMenu}>Pricing</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/faq" onClick={toggleMenu}>FAQ</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/questionnaire" onClick={toggleMenu}>Questionnaire</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sign-in" onClick={toggleMenu}>Register / Sign In</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
    </header>
  );
}

export default Header;
