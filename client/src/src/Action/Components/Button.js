import React from 'react';

function Button({label, callback, debug}) {

  if (!label) {
    throw new Error("Trying to create a Button Action with no label.");
  }
  if (!callback) {
    throw new Error("Trying to create a Button Action with no Action.");
  }

  return (
    <div className='action action--button'>
      <button onClick={ () => { callback() } }>
        { label }
      </button>
    </div>
  )

}

export default Button;
