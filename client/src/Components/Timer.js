import React, {useState, useEffect} from 'react'

const Timer = ({ duration }) => {
    const [timer, setTimer] = useState(duration);

    useEffect(()=>{
        setTimeout(()=>{
            setTimer(timer - 1000);
        }, 1000);
    },[timer]);

    const getFormattedTime = (m)=>{
        let tsec = parseInt(Math.floor(m / 1000));
        let tmin = parseInt(Math.floor(tsec / 60));
        let thrs = parseInt(Math.floor(tmin / 60));

        let sec = parseInt(tsec % 60);
        let min = parseInt(tmin % 60);
        let hrs = parseInt(thrs % 24);

        return `${hrs} hour ${min} minute ${sec} second`;
    }

    return (
        <>
            {getFormattedTime(timer)}
        </>
    )
}

export default Timer