import React from "react";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export default function Play(props) {
  const { handleClick } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <PlayCircleFilledIcon />
    </button>
  );
}