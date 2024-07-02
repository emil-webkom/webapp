'use client'

import { FC } from "react";
import { useState } from "react";

interface HSCardProps {
    data: Array<{
        rolle: string;
        name: string;
        text: string;
        mail: string;
        nummer: number;
        bilde: string;
    }>;
}

const HSCard: FC<HSCardProps> = ({data}) =>{
    const [currentIndex,setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const totalCards = data.length;

    // Functions for scrolling through styret-cards
    const handleNext = () => {
        if (isSliding) return;
        setIsSliding(true);
        setTimeout(() => {
            const isLastSlide = currentIndex === data.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
            setIsSliding(false);
        }, 0); 
    };

    const handlePrev = () => {
        if (isSliding) return;
        setIsSliding(true);
        setTimeout(() => {
            const isFirstSlide = currentIndex === 0;
            const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
            setIsSliding(false);
        }, 0); 
    };

    return (
        <div>
            <div className="flex items-center justify-center space-x-5">
                <button onClick={handlePrev} className="icon-hover">{"<-"}</button>
                <div className="relative w-[80%] h-[70vh] overflow-hidden">
                    <div
                        className={`flex transition-transform duration-300 ease-in-out transform ${
                            isSliding ? 'delay-300' : ''
                        }`}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {data.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-full flex items-center justify-between space-x-5 p-10 bg-[#003A42] rounded-md">
                                <div className="flex flex-col justify-between w-[60%] space-y-5 h-full">
                                    <div>
                                        <p className="text-3xl font-semibold">{item.rolle}</p>
                                        <p className="text-l font-normal">{item.name}</p>
                                    </div>
                                    <p className="text-medium font-extralight">{item.text}</p>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-light">Kontakt: {item.mail}</p>
                                        <p className="text-xs font-light">Tlf: +78{item.nummer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <img src={item.bilde} alt={item.rolle} className="w-[50vh] h-[50vh] object-cover rounded-md"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={handleNext} className="icon-hover">{"->"}</button>
            </div>
            <div className="flex justify-center py-2">
                {Array.from({length: totalCards}).map((_, index) => (
                    <span
                        key={index}
                        className={`mx-1 h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                    ></span>
                ))}
            </div>
        </div>
    )
};

export default HSCard;
