import React from 'react';
import Button from './Components/Button';
import Dropdown from './Components/Dropdown';

function Action({label, type, callback}) {
  let component = '';

  if (type) {
    switch (type) {
      case 'button':
        component = <Button label={ label } callback={ callback } />;
        break;

      case 'dropdown':
        component = <Dropdown label={ label } callback={ callback } />;
        break;
    }
  }

  function setActive(isActive = true) {
    if (isActive) {

    }
  }

  return (
    <div className="action">
      { component  }
    </div>
  );

}

export default Action;
