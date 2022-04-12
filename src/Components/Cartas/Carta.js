import React, { useState, useEffect } from 'react';
import './Carta.css';
import ReactCardFlip from 'react-card-flip';

export default function Carta({ carta, handleChoice, el1, el2, pareja }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        handleChoice(carta);
    };

    useEffect(() => {
        if (el1 && el2) {
            if (el1.src !== el2.src) {
                setTimeout(() => {
                    setIsFlipped(pareja);
                }, 1000);
            }
        }
    }, [el1, el2]);

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
            <div id='Carta'>
                <img
                    id='Atras'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Card_back_01.svg/703px-Card_back_01.svg.png'
                    onClick={handleClick}
                />
            </div>

            <div id='Carta'>{carta.src}</div>
        </ReactCardFlip>
    );
}
