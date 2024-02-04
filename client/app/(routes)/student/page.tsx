"use client";
import { SidePanel } from '@/app/_components/SidePanel/SidePanel';
import { VideoPanel } from '@/app/_components/VideoPanel/VideoPanel';
import socketSerivce from '@/app/_services/socketService';
import React from 'react';

const Page = () => {
  const socket = new socketSerivce();
  socket.joinRoom("this room");
  socket.sendToRoom("this room", "chats", "This is a message");

  return (
    <section className='bg-gray-200 p-3 h-screen w-screen platform grid gap-3 grid-cols-7 grid-rows-1'>
      <VideoPanel isTeacher={false} socket={socket} />
      <SidePanel />
    </section>
  );
};

export default Page;
