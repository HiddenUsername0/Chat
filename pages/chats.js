import React,{ useState, useEffect, useContext} from "react";
import {Context} from "../context";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ChatEngine = dynamic(()=>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(()=>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const {username, secret } = useContext(Context)
  const [showChat, setShowChat]= useState(false)
  const router = useRouter()

  useEffect(() =>{
    if (typeof document !== null){
      setShowChat(true);
    }
  });

  useEffect(()=>{
    if(username.length === 0 || secret.length ===0) router.push("/");
  });

  if(!showChat) return <div />

  return(
   <div className="background">
    <div className = "shadow">
      <ChatEngine
        height='calc(100vh - 200px)'
        projectID='48288a5e-9f78-4a13-9023-71167b673f14'
        userName = {username}
        userSecret = {secret}
        renderNewMessageForm={()=><MessageFormSocial />}
      />
    </div>
   </div>
  );
}
