import ChatBot from "react-simple-chatbot";

const steps = [
  { id: "1", message: "Welcome! How can I help you?", trigger: "2" },
  { id: "2", options: [{ value: "faq", label: "View FAQ", trigger: "3" }] },
  { id: "3", message: "Redirecting to FAQ...", end: true },
];

const AIChatbot = () => <ChatBot steps={steps} floating={true} />;

export default AIChatbot;
