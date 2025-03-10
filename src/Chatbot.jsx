
import React, { useEffect, useRef, useState } from 'react';
import './CustomChatbot.css';

const CustomChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
  const [collectingInfo, setCollectingInfo] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const messagesEndRef = useRef(null);

  // Define responses
  const botResponses = {
    greeting: "Hello! I'm SentrySight's AI assistant. How can I help you today?",
    features: "SentrySight uses cutting-edge AI technology to detect weapons and provide real-time security alerts. Our system integrates with your existing camera infrastructure to provide immediate notifications when potential threats are detected.",
    pricing: "We offer three pricing models: Flat Purchase at $2,000 per appliance with a $500 license fee, Basic Subscription at $15 per camera monthly, and Premium at $50 per camera monthly with additional security features tailored for businesses.",
    demo: "We'd be happy to show you a demo of our AI weapon detection system. To schedule a personalized demonstration, I'll need to collect a bit of information.",
    support: "Our technical support team is ready to assist with any questions about your SentrySight system. What issue are you experiencing?",
    askName: "Before we continue, could you please tell me your name?",
    askEmail: "Thanks, {name}! Now, could you please provide your email address so our team can contact you?",
    confirmInfo: "Thank you for providing your information! A member of our team will contact you at {email} soon. Is there anything specific you'd like us to address during our follow-up?",
    thanksForInfo: "Thank you for the additional information. We've added this to your request and someone from our team will be in touch shortly.",
    goodbye: "Thank you for your interest in SentrySight's AI security solutions. Our team will contact you soon at {email}. Have a great day!"
  };

  // Options for quick replies
  const initialOptions = [
    { id: 'features', text: 'AI Detection Capabilities' },
    { id: 'pricing', text: 'Pricing Information' },
    { id: 'demo', text: 'Request a Demo' },
    { id: 'support', text: 'Technical Support' }
  ];

  // Support options
  const supportOptions = [
    { id: 'installation', text: 'Installation Help' },
    { id: 'technical', text: 'Technical Issues' },
    { id: 'billing', text: 'Billing Questions' },
    { id: 'back', text: 'Back to Main Menu' }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting and options
      setMessages([
        { type: 'bot', text: botResponses.greeting },
        { type: 'options', options: initialOptions }
      ]);
    }
  }, [isOpen]);

  // Handle option selection
  const handleOptionClick = (optionId) => {
    // Add user selection to chat
    setMessages(prev => [...prev, { type: 'user', text: initialOptions.find(opt => opt.id === optionId).text }]);
    
    // If they're requesting a demo, start contact collection process
    if (optionId === 'demo') {
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { type: 'bot', text: botResponses[optionId] },
          { type: 'bot', text: botResponses.askName }
        ]);
        setCollectingInfo(true);
        setCurrentField('name');
      }, 500);
      return;
    }

    // If they're asking for support, show support options
    if (optionId === 'support') {
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { type: 'bot', text: botResponses[optionId] },
          { type: 'options', options: supportOptions }
        ]);
      }, 500);
      return;
    }

    // Regular response flow for other options
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { type: 'bot', text: botResponses[optionId] },
        { type: 'options', options: [
          { id: 'more', text: 'I have another question' },
          { id: 'contact', text: 'Contact me with more info' },
          { id: 'end', text: "That's all for now" }
        ]}
      ]);
    }, 500);
  };

  // Handle support options
  const handleSupportOption = (optionId) => {
    // Add user selection to chat
    const option = supportOptions.find(opt => opt.id === optionId);
    setMessages(prev => [...prev, { type: 'user', text: option.text }]);
    
    if (optionId === 'back') {
      // Return to main menu
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: 'What else would you like to know?' },
          { type: 'options', options: initialOptions }
        ]);
      }, 500);
      return;
    }

    // For support issues, collect contact information
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { type: 'bot', text: `We can help with your ${option.text.toLowerCase()}. To better assist you, we'll need some contact information.` },
        { type: 'bot', text: botResponses.askName }
      ]);
      setCollectingInfo(true);
      setCurrentField('name');
    }, 500);
  };

  // Handle "more questions", "contact me", or "end chat"
  const handleFollowUp = (optionId) => {
    setMessages(prev => {
      let userText = "That's all for now";
      if (optionId === 'more') userText = 'I have another question';
      if (optionId === 'contact') userText = 'Please contact me with more information';
      return [...prev, { type: 'user', text: userText }];
    });
    
    if (optionId === 'more') {
      // Show initial options again
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: 'What else would you like to know?' },
          { type: 'options', options: initialOptions }
        ]);
      }, 500);
    } else if (optionId === 'contact') {
      // Start contact collection process
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: "I'd be happy to have someone from our team contact you with more information." },
          { type: 'bot', text: botResponses.askName }
        ]);
        setCollectingInfo(true);
        setCurrentField('name');
      }, 500);
    } else {
      // End the conversation
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: 'Thank you for your interest in SentrySight. Have a great day!' }]);
      }, 500);
    }
  };

  // Handle form submission for text input
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', text: userInput }]);
    
    // Handle contact information collection
    if (collectingInfo) {
      if (currentField === 'name') {
        setContactInfo(prev => ({ ...prev, name: userInput }));
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { type: 'bot', text: botResponses.askEmail.replace('{name}', userInput) }
          ]);
          setCurrentField('email');
        }, 500);
      } 
      else if (currentField === 'email') {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInput)) {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { type: 'bot', text: "That doesn't appear to be a valid email address. Please provide a valid email so our team can contact you." }
            ]);
          }, 500);
        } else {
          setContactInfo(prev => ({ ...prev, email: userInput }));
          
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { type: 'bot', text: botResponses.confirmInfo.replace('{email}', userInput) }
            ]);
            setCurrentField('additional');
          }, 500);
        }
      }
      else if (currentField === 'additional') {
        // Additional info has been provided, complete the process
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { type: 'bot', text: botResponses.thanksForInfo },
            { type: 'bot', text: botResponses.goodbye.replace('{email}', contactInfo.email) }
          ]);
          setCollectingInfo(false);
          setCurrentField(null);
          
          // Here you would typically send the contact information to your backend
          console.log('Contact information collected:', {
            name: contactInfo.name,
            email: contactInfo.email,
            additionalInfo: userInput
          });
        }, 500);
      }
    }
    // Handle regular text input when not collecting contact info
    else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: "Thank you for your message. For specific information about SentrySight, our team will be happy to help." },
          { type: 'options', options: [
            { id: 'contact', text: 'Contact me with more info' },
            { id: 'more', text: 'I have another question' },
            { id: 'end', text: "That's all for now" }
          ]}
        ]);
      }, 800);
    }
    
    // Clear input field
    setUserInput('');
  };

  return (
    <div className="custom-chatbot">
      {/* Chat toggle button */}
      <button 
        className="chat-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>SentrySight Assistant</h3>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index}>
                {message.type === 'bot' && (
                  <div className="bot-message">
                    <div className="message-content">{message.text}</div>
                  </div>
                )}
                
                {message.type === 'user' && (
                  <div className="user-message">
                    <div className="message-content">{message.text}</div>
                  </div>
                )}
                
                {message.type === 'options' && !collectingInfo && (
                  <div className="options-container">
                    {message.options.map(option => (
                      <button
                        key={option.id}
                        className="option-button"
                        onClick={() => {
                          if (option.id === 'more' || option.id === 'end' || option.id === 'contact') {
                            handleFollowUp(option.id);
                          } else if (supportOptions.find(opt => opt.id === option.id)) {
                            handleSupportOption(option.id);
                          } else {
                            handleOptionClick(option.id);
                          }
                        }}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                collectingInfo 
                  ? currentField === 'name' 
                    ? "Enter your name..." 
                    : currentField === 'email' 
                      ? "Enter your email..." 
                      : "Type any additional information..."
                  : "Type your message..."
              }
              disabled={!collectingInfo && messages.length > 0 && messages[messages.length - 1].type === 'options'}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomChatbot;
