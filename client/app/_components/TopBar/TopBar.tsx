"use client";
import React, { useEffect, useState } from 'react';
import moment from "moment";

export const TopBar = () => {
    const [date, setDate] = useState({
        date: "",
        time: "",
    });
    useEffect(() => {
        const timer = () => {
            const now = moment().format('LLLL');
            console.log(now);
            setDate({
                ...date,
                date: `${moment().format('dddd')}  ${moment().format("MMM Do YY")}`,
                time: now.split(" ").slice(-2).join(" "),
            });
        };
        timer();
        setInterval(timer, 10000);
    }, []);

    return (
        <section className='min-h-[10vh] w-full px-6 py-4 flex justify-between'>
            <div className="details h-full flex flex-col justify-start">
                <h3 className='text-sm font-semibold text-gray-500 sans uppercase'>
                    {`${date.date}`}
                </h3>
                <h1 className='text-3xl font-semibold text-gray-700'>
                    Annual Plan Meeting
                </h1>
            </div>
            <div className='h-full flex items-center'>
                <span className="time-badge text-3xl text-gray-700 font-semibold">
                    {date.time}
                </span>
            </div>
        </section>
    );
};
