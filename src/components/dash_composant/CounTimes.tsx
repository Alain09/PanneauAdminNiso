import React from 'react';
import { SlidingNumber } from '../ui/sliding-number';
import { useCountdown } from '../hook_perso';

interface CounTimesProps {
    debut : Date | null
    fin: Date | null;
}

function CounTimes({ debut,fin }: CounTimesProps) {
    const {

        seconds,
        minutes,
        hours,
        days

    } = useCountdown({startTime:debut,endTime:fin});

    return (

        <div className=" grid grid-cols-4 gap-x-3 text-sm text-gray-950 ">
            <div className=" p-2 flex flex-col justify-center items-center  font-bold border border-gray-100 rounded-lg bg-white ">
                <SlidingNumber value={days} padStart={true} />
                <div>Jrs</div>
            </div>
            <div className="  p-2 flex flex-col justify-center items-center  font-bold border border-gray-100 rounded-lg bg-white  ">
                <SlidingNumber value={hours} padStart={true} />
                <div>Hrs</div>
            </div>
            <div className=" p-2 flex flex-col justify-center items-center  font-bold border border-gray-100 rounded-lg bg-white">
                <SlidingNumber value={minutes} padStart={true} />
                <div>Min</div>
            </div>
            <div className="  p-2 flex flex-col justify-center items-center  font-bold border border-gray-100 rounded-lg bg-white ">
                <SlidingNumber value={seconds} padStart={true} />
                <div>Sec</div>
            </div>

        </div>



    )
}

export default CounTimes