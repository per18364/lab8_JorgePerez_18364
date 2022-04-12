import React, { useState, useEffect } from 'react';
import Carta from './Cartas/Carta.js';
import '../index.css';
import {
    FaCanadianMapleLeaf,
    FaStickerMule,
    FaSnapchatGhost,
    FaBiohazard,
    FaDemocrat,
    FaDove,
} from 'react-icons/fa';

const Icons = [
    { src: <FaCanadianMapleLeaf />, pareja: false },
    { src: <FaBiohazard />, pareja: false },
    { src: <FaDemocrat />, pareja: false },
    { src: <FaDove />, pareja: false },
    { src: <FaSnapchatGhost />, pareja: false },
    { src: <FaStickerMule />, pareja: false },
];

export default function Game() {
    const [cartas, setCartas] = useState([]);
    const [turnos, setTurnos] = useState(0);

    const [eleccion1, setEleccion1] = useState(null);
    const [eleccion2, setEleccion2] = useState(null);

    const shuffleCards = () => {
        const shuffledCards = [...Icons, ...Icons]
            .sort(() => Math.random() - 0.5)
            .map((carta) => ({ ...carta, id: Math.random() }));

        setCartas(shuffledCards);
        setTurnos(0);
    };

    const handleChoice = (carta) => {
        eleccion1 ? setEleccion2(carta) : setEleccion1(carta);
    };

    useEffect(() => {
        if (eleccion1 && eleccion2) {
            if (eleccion1.src === eleccion2.src) {
                setCartas((cartasPrev) => {
                    return cartasPrev.map((carta) => {
                        if (carta.src === eleccion1.src) {
                            return { ...carta, pareja: true };
                        } else {
                            return carta;
                        }
                    });
                });
                resetTurno();
            } else {
                resetTurno();
            }
        }
    }, [eleccion1, eleccion2]);

    const resetTurno = () => {
        setEleccion1(null);
        setEleccion2(null);
        setTurnos(turnos + 1);
    };

    return (
        <>
            <div id='inicio'>
                <h1>Juego de Memoria</h1>
                <button id='start' onClick={shuffleCards}>
                    Iniciar Juego
                </button>
            </div>
            <div id='grid'>
                {cartas.map((carta) => (
                    <Carta
                        key={carta.id}
                        carta={carta}
                        handleChoice={handleChoice}
                        pareja={carta.pareja}
                        el1={eleccion1}
                        el2={eleccion2}
                    />
                ))}
            </div>
            <div id='inicio'>
                <h2>Turnos usados: {turnos}</h2>
            </div>
        </>
    );
}
