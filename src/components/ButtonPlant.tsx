import { CSSProperties, FC, useEffect, useState } from 'react'
import { PlantData } from '../types';

interface ButtonPlantProps {
    item: PlantData;
    canTimeOut?: boolean | undefined;
    isDebug?: boolean | undefined
    onBtnClick: (item: PlantData) => void;
}

const ButtonPlant: FC<ButtonPlantProps> = ({ item, canTimeOut, onBtnClick, isDebug}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let increasingTime: NodeJS.Timeout;

        if (canTimeOut) {
            timer = setTimeout(() => onBtnClick(item), 5000);
        }

        if ( isDebug && canTimeOut) {
            increasingTime = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(increasingTime);
                        return 100;
                    }
                    return prevProgress + 1;
                });
            }, 50); // 50ms * 100 = 5000ms (5 seconds) ทำให้ progress smooth
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            if (increasingTime) {
                clearInterval(increasingTime);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDebug]);

  return (
    <button 
        style={ 
            isDebug ? 
            { ...buttonPlantStyle.button, background: `linear-gradient(to left, #f2f3f5 ${progress}%, white ${progress}%)`} :
            buttonPlantStyle.button
        } 
        onClick={() => onBtnClick(item)}>
            { item.name } {isDebug && ( 5 - ((progress / 100) * 5)).toFixed(2)} 
    </button>
  )
}

const buttonPlantStyle: Record<string, CSSProperties> = {
    button: {
        width: '98%', 
        padding:'4%',
        margin: '1%',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '10px'
    }
}

export { ButtonPlant }