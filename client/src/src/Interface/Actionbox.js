import React from 'react';

function ActionBox({actions, prompt, addAction, frozen}) {

  // @todo: unsure if this will ever work, but we need to disable Actions if
  // the actionbox is set to be frozen.
  actions.forEach(action => {
    // action.setActive(frozen);
  })

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
