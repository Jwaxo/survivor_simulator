import React from 'react';
import PlayerCard from './../Player/Components/Playercard';

function PlayerBox({ players }) {

  return (
    <div className="player-box">
      Players here: ({ players.length })
      {players.map((player, index) =>
        <div className="player-box--player">{ player.toLinktext() }</div>
      )}
    </div>
  )

}

export default PlayerBox;
