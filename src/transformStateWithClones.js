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

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      const { extraData } = action;

      Object.assign(copyState, extraData);

      resultOfEachAction.push({ ...copyState });
    }

    if (action.type === 'removeProperties') {
      const { keysToRemove } = action;

      keysToRemove.forEach((key) => delete copyState[key]);
      resultOfEachAction.push({ ...copyState });
    }

    if (action.type === 'clear') {
      Object.keys(copyState).forEach((key) => delete copyState[key]);
      resultOfEachAction.push({ ...copyState });
    }
  });

  return resultOfEachAction;
}

module.exports = transformStateWithClones;
