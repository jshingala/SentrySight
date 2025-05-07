import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "./context/TranslationContext";
import "./AboutUs.css";

function AboutUs() {
  const { translateText, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({});

  useEffect(() => {
    const texts = {
      aboutTitle: "About SentrySight",
      aboutDescription:
        "At SentrySight, we believe in the power of technology to create safer spaces for everyone. By merging artificial intelligence with real-time detection systems, we bring the future of security to the present. Our solutions are crafted for businesses, schools, and communities seeking to proactively protect their spaces with precision and innovation.",
      ourMission: "Our Mission",
      missionDescription:
        "Our mission is to make security accessible, intelligent, and effortless for everyone. We are dedicated to developing AI-driven technologies that help detect potential risks early and effectively, reducing response time and enhancing overall safety.",
      whatWeOffer: "What We Offer",
      offerDescription:
        "From AI-powered detection systems that monitor spaces in real-time to customizable alerts and analytics, our products are designed with user needs in mind. SentrySight provides solutions that fit seamlessly into daily operations, adding an extra layer of security without the complexity.",
      meetOurTeam: "Meet Our Team",
      teamDescription:
        "Our team is composed of engineers, data scientists, and innovators driven by a commitment to safety and progress. With a collective background in AI, cybersecurity, and community safety, we bring a diverse skill set to every solution we create.",
      // Team member translations
      huyName: "Huy Dao",
      huyTitle: "CTO/Lead AI Engineer",
      huyBio: "Expert in computer vision and deep learning models.",
      ritchieName: "Ritchie Martinez",
      ritchieTitle: "CEO",
      ritchieBio: "Bridging technology and user needs for seamless security.",
      gavinName: "Gavin Garcia",
      gavinTitle: "CMO/Data Analyst",
      gavinBio: "Ensuring the company stays ahead of the trends.",
      enriqueName: "Enrique De La Torre",
      enriqueTitle: "Chief Operating Officer",
      enriqueBio: "Oversees daily operations, ensuring efficient execution of company strategy and processes.",
      joinUs: "Join Us in Making a Safer Tomorrow",
      joinUsDescription:
        "Whether you're looking to secure your business or simply want to learn more about the future of safety technology, we welcome you to connect with us. Together, we can create safer environments for all.",
      awardsRecognition: "Awards & Recognition",
      award1: "1st Place AI Hackathon",
      award2: "Second Place University Pitch Competition",
      award3: "2nd Place Statewide Competition",
    };

    async function translateContent() {
      const newTranslations = {};
      for (const key in texts) {
        newTranslations[key] = await translateText(texts[key]);
      }
      setTranslatedText(newTranslations);
    }

    translateContent();
    // re-run whenever language changes
  }, [language, translateText]);

  return (
    <motion.div
      className="about-us"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2 initial={{ x: -200 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
        {translatedText.aboutTitle}
      </motion.h2>

      <motion.p initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
        {translatedText.aboutDescription}
      </motion.p>

      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
        {translatedText.ourMission}
      </motion.h3>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
        {translatedText.missionDescription}
      </motion.p>

      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
        {translatedText.whatWeOffer}
      </motion.h3>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
        {translatedText.offerDescription}
      </motion.p>

      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}>
        {translatedText.meetOurTeam}
      </motion.h3>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>
        {translatedText.teamDescription}
      </motion.p>

      {/* Team Members Grid - Organized in two rows */}
      <div className="team-grid">
        <div className="team-row">
          {/* Team member 1: Huy Dao */}
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            <div className="member-photo">
              <img src="/src/assets/huypic.jpg" alt="Huy Dao" />
            </div>
            <h4>{translatedText.huyName}</h4>
            <p className="member-title">{translatedText.huyTitle}</p>
            <p className="member-bio">{translatedText.huyBio}</p>
          </motion.div>
          
          {/* Team member 2: Ritchie Martinez */}
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.8 }}
          >
            <div className="member-photo">
              <img src="/src/assets/ritchiepic.jpg" alt="Ritchie Martinez" />
            </div>
            <h4>{translatedText.ritchieName}</h4>
            <p className="member-title">{translatedText.ritchieTitle}</p>
            <p className="member-bio">{translatedText.ritchieBio}</p>
          </motion.div>
        </div>
        
        <div className="team-row">
          {/* Team member 3: Gavin Garcia */}
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            <div className="member-photo">
              <img src="/src/assets/gavinpic.jpg" alt="Gavin Garcia" />
            </div>
            <h4>{translatedText.gavinName}</h4>
            <p className="member-title">{translatedText.gavinTitle}</p>
            <p className="member-bio">{translatedText.gavinBio}</p>
          </motion.div>
          
          {/* Team member 4: Enrique De La Torre */}
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.8 }}
          >
            <div className="member-photo">
              <img src="/src/assets/enriquepic.jpg" alt="Enrique De La Torre" />
            </div>
            <h4>{translatedText.enriqueName}</h4>
            <p className="member-title">{translatedText.enriqueTitle}</p>
            <p className="member-bio">{translatedText.enriqueBio}</p>
          </motion.div>
        </div>
      </div>

      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}>
        {translatedText.joinUs}
      </motion.h3>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }}>
        {translatedText.joinUsDescription}
      </motion.p>

      <div className="awards-section">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 1 }}>
          {translatedText.awardsRecognition}
        </motion.h2>

        <div className="awards-gallery">
          <div className="awards-row">
            <div className="award-item">
              <img src="/src/assets/pic1.jpg" alt="Award 1" />
              <div className="award-caption">{translatedText.award1}</div>
            </div>
            <div className="award-item">
              <img src="/src/assets/pic2.jpg" alt="Award 2" />
              <div className="award-caption">{translatedText.award2}</div>
            </div>
          </div>
          <div className="award-item">
            <img src="/src/assets/pic3.jpg" alt="Award 3" />
            <div className="award-caption">{translatedText.award3}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutUs;