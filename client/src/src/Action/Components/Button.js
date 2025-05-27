import React from 'react';

function Button({label, callback}) {

  if (!label) {
    throw new Error("Trying to create a Button Action with no label.");
  }
  if (!callback) {
    throw new Error("Trying to create a Button Action with no Action.");
  }

  return (
    <button onClick={ () => { callback() } }>
      { label }
    </button>
  )

}

export default Button;
