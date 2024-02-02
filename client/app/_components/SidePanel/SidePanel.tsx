"use client";
import { Button, Fab, InputAdornment, InputBase, Paper, SnackbarContent, Stack, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Send } from '@mui/icons-material';
import Message from "../ChatBlob/index";
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

export const SidePanel = () => {
  let socket: any;
  const [inpMess, setInpMess] = useState("");
  const [messArr, setMessArr] = useState(
    [
      {
        index: nanoid(7),
        sender: false,
        data: "Welcome to the class!!!\nHope you've a great time learning!!!!"
      },
    ]
  );

  useEffect(() => {
    socket = io("http://localhost:8001");

    socket.on("message-receive", (data: any) => {
      setMessArr([data]);
      console.log('messArr[0].index: ', messArr[0].index);
      console.log('data.index: ', data.index);
      console.log('data: ', data);

      if (messArr[0].index != data.index) {
        console.log('messArr[0].index != data.index: ', messArr[0].index != data.index);
        setMessArr([data,...messArr]);
        console.log('messArr: 0123', messArr);
      }
    });
  });

  const handleMessageSend = () => {
    let data = {
      index: nanoid(7),
      sender: true,
      data: inpMess
    };
    setMessArr([...messArr, data]);
    socket.emit('message', { data: inpMess, index: data.index, sender:false });
    setInpMess("");
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
            handleMessageSend();
          }}
        >
          <InputBase
            placeholder="Message"
            id="outlined-start-adornment"
            sx={{ width: "80%" }}
            onChange={(e) => setInpMess(e.target.value)}
            value={inpMess}
          />
          <Fab color='info' aria-label="add" size='medium' sx={{ boxShadow: 'none', borderRadius: '0.4rem', margi: "2px" }}>
            <Send />
          </Fab>
        </Paper>
      </section>
    </section>
  );
};


