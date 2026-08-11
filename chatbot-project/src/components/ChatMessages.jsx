import { useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'

function ChatMessages({ chatMessages }) {
        const messagesEndRef = useRef(null);

        useEffect(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [chatMessages]);

        return (
          <div className="messages">
            {chatMessages.map((chatMessage) => (
              <ChatMessage
                message={chatMessage.message}
                sender={chatMessage.sender}
                timestamp={chatMessage.timestamp}
                key={chatMessage.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        );
      }

export default ChatMessages;