import { SidePanel } from '@/app/_components/SidePanel/SidePanel';
import { VideoPanel } from '@/app/_components/VideoPanel/VideoPanel';
import React from 'react';

const Page = () => {
  return (
    <section className='h-screen w-screen platform grid grid-cols-7 grid-rows-1 bg-green-400'>
      <VideoPanel/>
      <SidePanel/>
    </section>
  );
};

export default Page;
