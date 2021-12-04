import React from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user},dispatch] =useStateValue();
  useEffect(() => {
    const unsubscribe = db.collection("Rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeRoundedIcon />
          </IconButton>
          <IconButton>
            <ChatRoundedIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_searchbar">
        <div className="sidebar_searchbarcontainer">
          <SearchIcon></SearchIcon>
          <input placeholder="Search or start new chat" type="text"></input>
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
