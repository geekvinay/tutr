"use client";
import { Fab, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Send } from '@mui/icons-material';
import Message from "../ChatBlob/index";
import { nanoid } from 'nanoid';
import socketSerivce from '@/app/_services/socketService';

export const SidePanel = ({ socket }: { socket: socketSerivce; }) => {
  const [messArr, setMessArr] = useState(
    [
      {
        index: nanoid(7),
        sender: false,
        data: "Welcome to the class!!!\nHope you've a great time learning!!!!"
      },
    ]
  );
  const [mess, setMess] = useState("");

  const sendMessage = async () => {
    socket.sendToRoom(mess);
    setMess("");
  };

  return (
    <section className=" col-span-2 h-full w-full flex items-center justify-center shadow-md rounded-md">
      <section className="chats h-full rounded-lg p-3 w-full bg-gray-50 flex flex-col justify-between">
        <section className='chats-frame h-[90%] w-full bg-gray-200 p-3 rounded-md flex overflow-y-scroll flex-col-reverse justify-start'>
          {messArr.map((el) => (
            <Message key={el.index} message={{ sender: el.sender, data: el.data }} />
          ))}
        </section>
        <Paper
          component="form"
          sx={
            {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: "100%",
              border: "2px solid rgba(229, 231, 235)",
              borderRadius: "0.5rem",
              paddingLeft: "1rem",
              boxShadow: "2px 2px 2px rgba(229, 231, 235)",
              justifySelf: "flex-end"
            }
          }
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <InputBase
            placeholder="Message"
            id="outlined-start-adornment"
            sx={{ width: "80%" }}
            onChange={(e) => {
              setMess(e.target.value);
            }}
          />
          <Fab color='info' aria-label="add" size='medium' sx={{ boxShadow: 'none', borderRadius: '0.4rem', margin: "2px" }} onClick={sendMessage}>
            <Send />
          </Fab>
        </Paper>
      </section>
    </section>
  );
};


