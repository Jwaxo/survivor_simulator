import React from 'react';

const Utilities = {

  arrayToString: properties => {
    return (
      <>
       { properties.join(', ') }
      </>
    );
  },

  arrayToList: properties => {
    return (
      <ul>
        { properties.map((property, index) => (
          <li key={ index }>{ property.render() }</li>
        ))}
      </ul>
    )
  },

  arrayToLabelledList: properties => {
    return (
      <ul>
        { properties.map((property, index) => (
          <li key={ index }><strong>{ index }</strong>: { property.render() }</li>
        )) }
      </ul>
    )
  },

  objectToList: object => {
    const items = [];
    for (const property in object) {
      items.push(<li key={ property }><strong>{ property }</strong>: { object[property] }</li>);
    }

    return (
      <ul>
        { items }
      </ul>
    )
  },

  rollD20: (mod = 0) => {
    return Math.floor(Math.random() * 20) + mod;
  },

}

export default Utilities;
