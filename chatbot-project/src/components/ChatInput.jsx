import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'supersimpledev/dayjs'

  function ChatInput({ setChatMessages }) {
        const [inputValue, setInputValue] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        function saveInputValue(event) {
          setInputValue(event.target.value);
        }

        async function sendMessage() {
          const messageText = inputValue.trim();
          if (!messageText || isLoading) {
            return;
          }

          const userMessageId = `id${Date.now()}`;
          const loadingMessageId = `id${Date.now() + 1}`;
          const newMessage = {
            message: messageText,
            sender: "user",
            id: userMessageId,
            timestamp: dayjs().format("HH:mm")
          };
          const loadingMessage = {
            message: "Thinking...",
            sender: "robot",
            id: loadingMessageId,
            timestamp: dayjs().format("HH:mm")
          };

          setIsLoading(true);
          setChatMessages((prevMessages) => [...prevMessages, newMessage, loadingMessage]);
          setInputValue("");

          let botMessage;
          try {
            const response = await Chatbot.getResponseAsync(messageText);
            botMessage = {
              message: response,
              sender: "robot",
              id: `id${Date.now() + 2}`,
              timestamp: dayjs().format("HH:mm")
            };
          } finally {
            setChatMessages((prevMessages) => {
              const messagesWithoutLoading = prevMessages.filter(
                (message) => message.id !== loadingMessageId
              );
              if (!botMessage) {
                return messagesWithoutLoading;
              }
              return [...messagesWithoutLoading, botMessage];
            });
            setIsLoading(false);
          }
        }

        return (
          <div className="input-area">
            <input
              type="text"
              placeholder="Send a message to the chatbot"
              onChange={saveInputValue}
              value={inputValue}
              disabled={isLoading}
              onKeyDown={(event) => {
                if (event.key === "Enter" && inputValue.trim() && !isLoading) {
                  sendMessage();
                }
                if (event.key === "Escape") {
                  setInputValue("");
                }
              }}
            />
            <button onClick={sendMessage} disabled={!inputValue.trim() || isLoading}>
              Send
            </button>
          </div>
        );
      }

      export default ChatInput;