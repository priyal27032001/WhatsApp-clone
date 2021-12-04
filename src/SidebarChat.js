import React from "react";
import "./SidebarChat.css";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import db from "./firebase";
import { Link } from "react-router-dom";
function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState(1000);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const creatChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${ seed }.svg`}
        />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={creatChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
