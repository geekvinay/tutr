import { SidePanel } from '@/app/_components/SidePanel/SidePanel';
import { VideoPanel } from '@/app/_components/VideoPanel/VideoPanel';
import React from 'react';

const Page = () => {
  return (
    <section className='bg-gray-200 p-3 h-screen w-screen platform grid gap-3 grid-cols-7 grid-rows-1'>
      <VideoPanel isTeacher={false} />
      <SidePanel />
    </section>
  );
};

export default Page;
