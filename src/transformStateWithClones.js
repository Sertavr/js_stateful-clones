'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultOfEachAction = [];
  const copyState = { ...state };

  copyState.forEach((action) => {
    if (action.type === 'addProperties') {
      const stateForAddProp = { ...state };
      const { extraData } = action;

      Object.assign(stateForAddProp, extraData);

      // Object.entries(extraData).forEach((entry) => {
      //   const [key, value] = entry;

      //   stateForAddProp[key] = value;
      // });
      resultOfEachAction.push(stateForAddProp);
    }

    if (action.type === 'removeProperties') {
      const stateRemoveProp = { ...state };
      const { keysToRemove } = action;

      keysToRemove.forEach((key) => delete stateRemoveProp[key]);
      resultOfEachAction.push(stateRemoveProp);
    }

    if (action.type === 'clear') {
      const stateDelProp = { ...state };

      Object.keys(state).forEach((key) => delete stateDelProp[key]);
      resultOfEachAction.push(stateDelProp);
    }
  });

  return resultOfEachAction;
}

module.exports = transformStateWithClones;
