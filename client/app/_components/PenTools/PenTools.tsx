import { ArrowForwardIosOutlined, ArrowBackIosNewOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const PenTools = ({operations} : {operations : any}) => {
  return (
    <section className='pen-tools z-10 min-w-[40vw] h-[5rem] rounded-[50px] bg-slate-300 flex items-center justify-between hover:cursor-grab'>
      <div className='relative h-full w-fit flex items-center px-3'>
        <Button color='info' size='small' sx={{ transform:"scale(0.7)", margin:"none"}} onClick={operations.undoOperation}>
          <ArrowBackIosNewOutlined/>
        </Button>
        <Button color='info' size='small' sx={{ transform:"scale(0.7)", margin:"none"}}>
          <ArrowForwardIosOutlined />
        </Button>
      </div>
    </section>
  );
};

export default PenTools;