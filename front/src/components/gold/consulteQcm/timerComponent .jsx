import React, { useEffect, useState } from 'react';

function TimerComponent({ isActive, stepss }) {
    console.log('stepss')
    console.log(stepss)
    localStorage.setItem('seconds', 0);
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setSeconds(seconds => seconds + 1);

            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive]);

    useEffect(() => {
        localStorage.setItem('seconds', seconds);
    }, [seconds]);
    useEffect(() => {
        setSeconds(0)
    }, [stepss]);

    return (seconds);
}

export default TimerComponent;
