import React, { Suspense, useEffect, useRef, useState } from 'react';
import './game.css';
import ScoreBoard from './utils/scoreboard';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas } from 'react-three-fiber'; // Import Canvas from react-three-fiber
import { OrbitControls } from '@react-three/drei';
import TableX from './assets/TableX';
function AllGame() {
    const [count,setCount] = useState(0);
    return (
        <>
            <div className="container1">
                <div className="Game">
                    <div className='ScoreBoard'>
                        <ScoreBoard/>
                    </div>
                    <div className='OnlineGame'>
                        <Canvas>
                                            {/* Ambient light */}
                                            <ambientLight intensity={3} />

                    {/* Directional light */}
                    <directionalLight color="white" intensity={0.8} position={[5, 5, 5]} />

                    {/* Point light */}
                    <pointLight color="white" intensity={0.8} position={[-10, 10, 10]} />

                    {/* Spot light */}
                    <spotLight color="white" intensity={0.8} position={[10, 10, 10]} angle={Math.PI / 6} penumbra={0.2} />


                                            <OrbitControls/>
                            <Suspense fallback ={null}>
                        <TableX/>
                        </Suspense>
                        </Canvas>
                    </div>
                </div>
                <div className="quit">
                    <input id="checkbox" type="checkbox" />
                    <label className="switch" htmlFor="checkbox">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="slider">
                            <path
                                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
                            ></path>
                        </svg>
                    </label>
                </div>
            </div>      
        </>
    );
};

export default AllGame;