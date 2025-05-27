import React from 'react';
import Utilities from '../Utilities';

function ActionBox({categories, prompt, addAction, frozen}) {

  // @todo: unsure if this will ever work, but we need to disable Actions if
  // the actionbox is set to be frozen.

  categories.forEach(category => {
    category.actions.forEach(action => {
      // action.setActive(frozen);
    });
  });

  console.log(categories);

  return (
    <div className="action-box">
      <div className="actions-prompt">{ prompt }</div>
      { categories.length > 0 ? (
        categories.map((actionCategory, category_index) => (
          <div className="actions-category" key={category_index}>
            <strong>{ Utilities.capitalizeString(actionCategory.category) }</strong>
            <ol className="actions-list">
              { actionCategory.actions.map((action, index) => (
                <li className="actions-item" key={index}>
                  { action.render() }
                </li>
              )) }
            </ol>
          </div>
        ))
      ) : ''}
    </div>
  );

}

export default ActionBox;
