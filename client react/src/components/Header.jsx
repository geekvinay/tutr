// Importing all the icons
import { IconButton } from "@mui/material";
import { Fullscreen, Undo, Redo, Create, AutoFixHigh, Draw, LineWeight, BlurOn, PeopleAlt, Wifi, EditOffOutlined } from '@mui/icons-material';

import "../assets/header.css";

const Header = () => {
  return (
    <header className="toolbar h-full w-full bg-gray-100 rounded-lg shadow-sm col-span-2">
      <ul className="w-full h-full flex-col justify-center items-center px-2 py-2">
        <div className="w-full h-fit px-8 flex justify-around items-center">
          <IconButton aria-label="mouse">
            <Wifi className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="mouse">
            <PeopleAlt className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="delete">
            <Fullscreen className="m-[0.5rem] text-gray-600 font-bold" />
          </IconButton>
        </div>
        <div className="w-[80%] mx-auto my-2 h-0 border-y-[1.5px] border-gray-200 rounded-xl"></div>
        <div className="w-full h-fit px-8 flex justify-around items-center">
          <IconButton aria-label="mouse">
            <Create className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="mouse">
            <AutoFixHigh className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="mouse">
            <Draw className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="mouse">
            <EditOffOutlined className="m-[0.5rem] text-gray-600" />
          </IconButton>
        </div>
        <div className="w-[80%] mx-auto my-2 h-0 border-y-[1.5px] border-gray-200 rounded-xl"></div>
        <div className="w-full h-fit px-8 flex justify-around items-center">
          <IconButton aria-label="mouse">
            <LineWeight className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="mouse">
            <BlurOn className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="undo">
            <Undo className="m-[0.5rem] text-gray-600" />
          </IconButton>
          <IconButton aria-label="redo">
            <Redo className="m-[0.5rem] text-gray-600" />
          </IconButton>
        </div>
      </ul>
    </header>
  );
};

export default Header;