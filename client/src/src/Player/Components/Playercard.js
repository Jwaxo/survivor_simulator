import React from 'react';
import Utilities from './../../Utilities';
import TribeFlag from '../../Tribe/Components/Tribeflag';
import Config from '../../../Config';

function PlayerCard({ player }) {

  const classes = [
    "player",
    "player-card",
    player.getColor() ?? '',
    `text--${player.getTextColor()}`,
  ].join(' ').trim();

  if (!player) return "";
  return (
    <div className={ classes }>
      <h3>{ player.getNameString() }</h3>
      <div className="player-info">
        <ul>
          <li key="occupation">{ player.occupation.getName() }</li>
          <li key="origin">{ player.origin.render() }</li>
          <li key="tribe"><TribeFlag tribe={ player.getTribe() } /></li>
          { player.injuries.length > 0 ? (
            <li key="injuries">{ Utilities.arrayToList(player.injuries) } </li>
          ) : '' }
          { Config.debug === true ? (
            <>
              <li key="stats">{ player.stats.render() }</li>
              <li key="traits">{ Utilities.arrayToString(player.traits) }</li>
              <li key="alliances">{ Utilities.arrayToList(player.alliances) }</li>
              <li key="relationships">{ Utilities.arrayToList(player.relationships) }</li>
            </>
          ) : '' }
        </ul>
      </div>
    </div>
  )

}

export default PlayerCard;
