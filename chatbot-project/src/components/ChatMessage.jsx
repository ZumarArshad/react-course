import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'

function ChatMessage({ message, sender, timestamp }) {
  return (
    <div className={`message-row ${sender === "user" ? "user" : "robot"}`}>
      {sender === "robot" && (
        <div className="avatar">
          <img src={RobotProfileImage} alt="Robot" />
        </div>
      )}
      <div className="message-bubble">
        <div className="message-content">{message}</div>
        <span className="timestamp">{timestamp}</span>
      </div>
      {sender === "user" && (
        <div className="avatar">
          <img src={UserProfileImage} alt="User" />
        </div>
      )}
    </div>
  );
}

export default ChatMessage;