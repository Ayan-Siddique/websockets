"use client"

import { useEffect, useState } from "react";


export default function Home() {
  const [input, setinput] = useState("")
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [message, setMessage] = useState<string[]>([])
  useEffect(()=>{
    
const ws = new WebSocket('ws://localhost:8080')
    ws.onopen=()=>{
      setSocket(ws)
    }
      
    ws.onmessage=(msg:any)=>{
      setMessage((pevmsg)=>[...pevmsg,msg.data])
    }

    return ()=>{
      ws.close()
    }
  },[])
const handleSend = ()=>{
  socket?.send(input)
  setinput("")
}

if(!socket) return <h1>loading........</h1>
  
  return (
    <>
    <h1 className="text-orange-500 mb-8 font-black font-extrabold text-3xl">
      Connected to Websocket
      </h1>
      <div className="flex gap-4 mb-8">
      <input 
      type="text" placeholder="Type a message" 
      className="input" 
      onChange={(e)=>{
        setinput(e.target.value)
      }}
      value={input}
      />
            <button 
            className="btn btn-primary"
            onClick={handleSend}
            >Send</button>
      </div>

    <ul className="flex flex-col w-3/4">
      {message.map((msg,idx)=>{
        return (<div key={idx} className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                            {msg}
                    </div>
                </div>)
      })}
    </ul>
    </>
  );
}
