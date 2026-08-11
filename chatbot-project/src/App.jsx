import { useEffect, useState } from 'react'
import dayjs from 'supersimpledev/dayjs'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'  

const CHAT_MESSAGES_STORAGE_KEY = "chatbot-project-messages";

function getDefaultChatMessages() {
  return [
    {
      message: "Hello! I’m your friendly chatbot.",
      sender: "user",
      id: "id1",
      timestamp: dayjs().subtract(3, "minute").format("HH:mm")
    },
    {
      message: "Hello! How can I help you today?",
      sender: "robot",
      id: "id2",
      timestamp: dayjs().subtract(2, "minute").format("HH:mm")
    },
    {
      message: "Can you get me today's date?",
      sender: "user",
      id: "id3",
      timestamp: dayjs().subtract(1, "minute").format("HH:mm")
    },
    {
      message: `Today's date is ${dayjs().format("MMMM D")}`,
      sender: "robot",
      id: "id4",
      timestamp: dayjs().format("HH:mm")
    }
  ];
}

function getInitialChatMessages() {
  const savedMessages = window.localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);

  if (!savedMessages) {
    return getDefaultChatMessages();
  }

  try {
    const parsedMessages = JSON.parse(savedMessages);

    if (!Array.isArray(parsedMessages)) {
      console.error("Saved chat messages are not in the expected format.");
      window.localStorage.removeItem(CHAT_MESSAGES_STORAGE_KEY);
      return getDefaultChatMessages();
    }

    return parsedMessages;
  } catch (error) {
    console.error("Failed to read saved chat messages from localStorage.", error);
    window.localStorage.removeItem(CHAT_MESSAGES_STORAGE_KEY);
    return getDefaultChatMessages();
  }
}

function App() {
        const [chatMessages, setChatMessages] = useState(getInitialChatMessages);

        useEffect(() => {
          window.localStorage.setItem(
            CHAT_MESSAGES_STORAGE_KEY,
            JSON.stringify(chatMessages)
          );
        }, [chatMessages]);

        return (
          <div className="chat-app">
            <div className="chat-header">
              <h1>Chat Application</h1>
              <p>Ask anything and I’ll respond instantly.</p>
            </div>
            <div className="chat-body">
              <ChatMessages chatMessages={chatMessages} />
              <ChatInput setChatMessages={setChatMessages} />
            </div>
          </div>
        );
      }

export default App
