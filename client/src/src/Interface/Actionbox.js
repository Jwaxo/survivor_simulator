import React from 'react';

function ActionBox({actions, prompt, addAction}) {

  return (
    <div className="action-box">
      <div className="actions-prompt">{ prompt }</div>
      { actions.length > 0 ? (
        <ul className="actions-list">
          { actions.map((action, index) => (
            <li className="actions-item" key={index}>
              { action }
            </li>
          )) }
        </ul>
      ) : ''}
    </div>
  );

}

export default ActionBox;
