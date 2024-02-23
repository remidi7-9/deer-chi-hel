import React from 'react';
import './levelup.css';


function LevelUP()
{
	// const progress = document.querySelector('.progress-done');
	// progress.style.width = progress.getAttribute('data-done') + '%';
	// progress.style.opacity = 1;

    return (
        <>
<div className="progress">
	<div className="progress-done" data-done="70">
		70%
	</div>
</div>
	<div className='barStats'>
	<ul className="menu-bar">
    <li>Results</li>
    <li>Live Matchs</li>
    <li>Achievement</li>
	</ul>
	</div>
		</>
    );
    
};

export default LevelUP;