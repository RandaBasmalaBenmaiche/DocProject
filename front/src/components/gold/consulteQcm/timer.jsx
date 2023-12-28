import * as React from 'react';
const Timer = ({isActive}) => {
    React.useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive]);
    const [seconds, setSeconds] = React.useState(0);
    return ( 
        <>
             {seconds} <small>s</small>
        </>
     );
}
 
export default Timer;