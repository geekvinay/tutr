import React from 'react';
import { TopBar } from '../TopBar/TopBar';
import Whiteboard from '../Whiteboard/Whiteboard';

export const VideoPanel = ({ isTeacher }: { isTeacher: boolean; }) => {
  return (
    <section className='h-full w-full col-span-5 flex flex-col justify-start items-start shadow-md'>
      <Whiteboard isTeacher={isTeacher} />
    </section>
  );
};
