import React from 'react';
import PlayerCard from './../Player/Components/Playercard';

function PlayerBox({ players, debug }) {

  return (
    <div className="player-box">
      Players ({ players.length })
      {players.map((player, index) =>
        <PlayerCard player={ player } key={ index } debug={ debug } />
      )}
    </div>
  )

}

export default PlayerBox;
