import React from "react";
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

export default function Play(props) {
  const { handleClick } = props;
  
  return (
    <button className="player__button" onClick={() => handleClick()}>
      <PauseCircleFilledIcon />
    </button>
  );
}