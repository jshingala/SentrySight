import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // FontAwesome icons
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./assets/Logo.png";
import "./global.css";

function Header({ userEmail, isAdmin }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 40px',
      zIndex: 1000,
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: 'rgba(26, 26, 26, 0.9)',
    },
    scrolledHeader: {
      backgroundColor: 'rgba(26, 26, 26, 0.95)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    logo: {
      height: '40px',
      marginRight: '10px',
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
    },
    navLink: {
      color: '#FFFFFF',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      position: 'relative',
      transition: 'color 0.3s ease',
    },
    activeNavLink: {
      color: '#8a89e6',
    },
    navLinkHover: {
      color: '#8a89e6',
    },
    menuIcon: {
      color: '#FFFFFF',
      cursor: 'pointer',
      zIndex: 1001,
    },
    dropdownMenu: {
      position: 'absolute',
      top: '70px',
      left: 0,
      width: '100%',
      backgroundColor: '#1A1A1A',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    dropdownLink: {
      color: '#FFFFFF',
      textDecoration: 'none',
      fontSize: '1.1rem',
      padding: '15px 20px',
      borderBottom: '1px solid #333333',
      transition: 'background-color 0.3s ease',
    },
    dropdownLinkHover: {
      backgroundColor: '#333333',
    },
    themeToggle: {
      background: 'transparent',
      border: 'none',
      color: '#FFFFFF',
      fontSize: '1.2rem',
      cursor: 'pointer',
      marginLeft: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

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
    <header 
      style={{
        ...styles.header,
        ...(scrolled ? styles.scrolledHeader : {})
      }}
    >
      <div 
        style={styles.logoContainer}
        onClick={handleHomeClick}
      >
        <img src={Logo} alt="SentrySight Logo" style={styles.logo} />
      </div>

      {isMobile ? (
        <div 
          style={styles.menuIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
      ) : (
        <nav style={styles.navLinks}>
          <NavLink 
            to="/about" 
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {})
            })}
            onMouseOver={(e) => e.target.style.color = '#8a89e6'}
            onMouseOut={(e) => e.target.style.color = e.target.classList.contains('active') ? '#8a89e6' : '#FFFFFF'}
          >
            About
          </NavLink>
          <NavLink 
            to="/demo" 
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {})
            })}
            onMouseOver={(e) => e.target.style.color = '#8a89e6'}
            onMouseOut={(e) => e.target.style.color = e.target.classList.contains('active') ? '#8a89e6' : '#FFFFFF'}
          >
            Demo
          </NavLink>
          <NavLink 
            to={isAdmin ? "/questionnaire_A" : "/questionnaire"} 
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {})
            })}
            onMouseOver={(e) => e.target.style.color = '#8a89e6'}
            onMouseOut={(e) => e.target.style.color = e.target.classList.contains('active') ? '#8a89e6' : '#FFFFFF'}
          >
            Questionnaire
          </NavLink>
          <NavLink 
            to="/pricing" 
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {})
            })}
            onMouseOver={(e) => e.target.style.color = '#8a89e6'}
            onMouseOut={(e) => e.target.style.color = e.target.classList.contains('active') ? '#8a89e6' : '#FFFFFF'}
          >
            Pricing
          </NavLink>
          <NavLink 
            to="/contact" 
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {})
            })}
            onMouseOver={(e) => e.target.style.color = '#8a89e6'}
            onMouseOut={(e) => e.target.style.color = e.target.classList.contains('active') ? '#8a89e6' : '#FFFFFF'}
          >
            Contact
          </NavLink>
          {userEmail ? (
            <NavLink 
              to="/profile" 
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.activeNavLink : {})
              })}
              onMouseOver={(e) => e.target.style.color = '#8a89e6'}
              onMouseOut={(e) => e.target.style.color = e.target.classList.contains('active') ? '#8a89e6' : '#FFFFFF'}
            >
              Profile
            </NavLink>
          ) : (
            <NavLink 
              to="/sign-in" 
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.activeNavLink : {})
              })}
              onMouseOver={(e) => e.target.style.color = '#8a89e6'}
              onMouseOut={(e) => e.target.style.color = e.target.classList.contains('active') ? '#8a89e6' : '#FFFFFF'}
            >
              Sign In
            </NavLink>
          )}
        </nav>
      )}

      {menuOpen && isMobile && (
        <div style={styles.dropdownMenu}>
          <NavLink 
            to="/about" 
            style={styles.dropdownLink}
            onClick={() => setMenuOpen(false)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            About
          </NavLink>
          <NavLink 
            to="/demo" 
            style={styles.dropdownLink}
            onClick={() => setMenuOpen(false)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Demo
          </NavLink>
          <NavLink 
            to={isAdmin ? "/questionnaire_A" : "/questionnaire"} 
            style={styles.dropdownLink}
            onClick={() => setMenuOpen(false)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Questionnaire
          </NavLink>
          <NavLink 
            to="/pricing" 
            style={styles.dropdownLink}
            onClick={() => setMenuOpen(false)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Pricing
          </NavLink>
          <NavLink 
            to="/contact" 
            style={styles.dropdownLink}
            onClick={() => setMenuOpen(false)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Contact
          </NavLink>
          {userEmail ? (
            <NavLink 
              to="/profile" 
              style={styles.dropdownLink}
              onClick={() => setMenuOpen(false)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Profile
            </NavLink>
          ) : (
            <NavLink 
              to="/sign-in" 
              style={styles.dropdownLink}
              onClick={() => setMenuOpen(false)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Sign In
            </NavLink>
          )}
        </div>
      )}

      <button 
        className="theme-toggle"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;