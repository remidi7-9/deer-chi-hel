import React from 'react';
import './scoreboard.css';

function ScoreBoard() {
    return (
        <>
         
<div class="ScoreBoard">
  <div class="team home">
    <div class="color"></div>
    <div class="name"><span>Kremidi</span></div>
  </div>
  <div class="logo"></div>
  <div class="goals">
    <div class="goal home"><span>11</span></div>
    <div class="divider"><span>-</span></div>
    <div class="goal away"><span>0</span></div>
  </div>
  <div class="time"><span> <span class="minute">93</span><span class="time-divider">:</span><span class="second">56</span></span></div>
  <div class="extra-time"><span>+4'</span></div>
  <div class="team away">
    <div class="color"></div>
    <div class="name"><span>Smeftah-</span></div>
  </div>
</div>
        </>
    );
};

export default ScoreBoard;
