import React, { useState } from 'react'
import './Timer.css'

const Timer = () => {
    const [day, setDay] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [seconds, setSeconds] = useState('')
    const deadline = new Date("Oct 23, 2020 00:00:00").getTime();
    const x = setInterval(function () {
        const now = new Date().getTime();
        const t = deadline - now;
        setDay(Math.floor(t / (1000 * 60 * 60 * 24)))
        setHour(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinute(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)))
        setSeconds(Math.floor((t % (1000 * 60)) / 1000))
    }, 1000);
    return (
        <div className="page">
            <div className="countdown-col col">
                <div className="time middle">
                    <span style={{ fontSize: '20px', fontWeight: '500' }}>
                        <div id="d">{day}</div>
					Days
				</span>
                    <span style={{ fontSize: '20px', fontWeight: '500' }}>
                        <div id="h">{hour}</div>
					Hours
				</span>
                    <span style={{ fontSize: '20px', fontWeight: '500' }}>
                        <div id="m">{minute}</div>
					Minutes
				</span>
                    <span style={{ fontSize: '20px', fontWeight: '500' }}>
                        <div id="s">{seconds}</div>
					Seconds
				</span>
                </div>
            </div>
        </div>
    );
};

export default Timer;