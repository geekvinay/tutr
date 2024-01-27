import React from 'react';

const Message = ({ message }: { message: { sender: boolean, data: string; }; }) => {
    const messageReceiever = "py-2 px-3 mt-3 max-w-[70%] bg-gray-400 text-white rounded-br-lg rounded-t-lg";
    const messageSender = "py-2 px-3 mt-3 max-w-[70%] bg-sky-600 text-white rounded-t-lg self-end rounded-bl-lg";
  
    return (
        <div className={message.sender == true ? messageSender: messageReceiever}>{message.data}</div>
    );
};

export default Message;