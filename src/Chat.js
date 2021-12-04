import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import "./Chat.css";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("Rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("Rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${Math.floor(
            Math.random() * 5000
          )}.svg`}
        />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>last seen{" "}
          {new Date(messages[messages.length-1] && messages[messages.length-1].timestamp && messages[messages.length-1].timestamp.toDate()).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={(message.name===user.displayName) ? "chat_message chat_receiver" : "chat_message"}>
            <span class="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timeStamp">
              {new Date(message.timestamp && message.timestamp.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button type="submit" onClick={sendMessage}>
            send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
