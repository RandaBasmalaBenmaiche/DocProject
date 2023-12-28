import React from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import './style.scss';
import useAudioPlayer from './useAudioPlayer';

const  Player = ({onPlay, title , desc, audio})=> {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (
    <div className="player">
      <audio id="audio">
        <source src={audio} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName={title} songArtist={desc} />
      <div className="controls">
        {playing ? 
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => {setPlaying(true); onPlay()}}/>
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
    </div>
  );
}

export default Player;