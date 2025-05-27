import React from 'react';

function Link({label, callback}) {

  if (!label) {
    throw new Error("Trying to create a Link Action with no label.");
  }
  if (!callback) {
    throw new Error("Trying to create a Link Action with no Action.");
  }

  return (
    <a onClick={ () => { callback() } }>
      { label }
    </a>
  )

}

export default Link;
