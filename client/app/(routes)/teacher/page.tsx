"use client";
import { SidePanel } from '@/app/_components/SidePanel/SidePanel';
import { VideoPanel } from '@/app/_components/VideoPanel/VideoPanel';
import socketSerivce from '@/app/_services/socketService';
import React from 'react';

const Page = () => {
  const socket = new socketSerivce();
  socket.joinRoom("this room");
  
  return (
    <section className='h-screen w-screen overflow-hidden p-4 gap-4 platform grid grid-cols-7 grid-rows-1 bg-gray-200'>
      <VideoPanel isTeacher={true} socket={socket}/>
      <SidePanel/>
    </section>
  );
};

export default Page;
