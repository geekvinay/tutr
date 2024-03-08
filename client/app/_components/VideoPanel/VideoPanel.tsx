import React from 'react';
import Whiteboard from '../Whiteboard/Whiteboard';
import PenTools from '../PenTools/PenTools';

export const VideoPanel = ({ isTeacher, socket }: { isTeacher: boolean; socket: any }) => {
  return (
    <section className='relative h-full w-full col-span-5 flex flex-col justify-start items-center shadow-md'>
      <Whiteboard isTeacher={isTeacher} socket={socket}/>
      {
        isTeacher ?
          <div className='absolute bottom-4'>
            <PenTools operations={""} />
          </div>
          :
          <></>
      }
    </section >
  );
};

