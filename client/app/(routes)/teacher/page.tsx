"use client";
import { SidePanel } from '@/app/_components/SidePanel/SidePanel';
import VideoConference from '@/app/_components/VideoConfernce/VideoConfernce';
import { VideoPanel } from '@/app/_components/VideoPanel/VideoPanel';
import socketSerivce from '@/app/_services/socketService';
import React from 'react';
const roomId: string = process.env.ROOM_ID as string;

const Page = () => {
  const socket = new socketSerivce(roomId);
  
  socket.sendToRoom("Hello there, Everyone!!!");
  
  socket.socket.on('sendMessage', (mess)=>{
    console.log('mess: ', mess);
  })
  
  return (
    <section className='h-screen w-screen overflow-hidden p-4 gap-4 platform grid grid-cols-7 grid-rows-1 bg-gray-200'>
      <VideoConference></VideoConference>
      {/* <VideoPanel isTeacher={true} socket={socket} />
      <SidePanel socket={socket}/> */}
    </section>
  );
};

export default Page;