import React from 'react';
import Button from './Components/Button';
import Dropdown from './Components/Dropdown';
import Link from './Components/Link';

class Action {
  label = "";
  type = "";
  callback = () => {};

  constructor(label, callback, type) {
    this.label = label;
    this.type = type;
    this.callback = callback;
  }

  setActive(isActive = true) {
    if (isActive) {

    }
  }

  render() {
    let component = "";
    switch (this.type) {
      case 'button':
        component = <Button label={ this.label } callback={ this.callback } />;
        break;

      case 'dropdown':
        component = <Dropdown label={ this.label } callback={ this.callback } />;
        break;

      case 'link':
      default:
        component = <Link label={ this.label } callback={ this.callback } />;
    }

    return (
      <div className="action">
        { component }
      </div>
    );
  }

}

export default Action;
