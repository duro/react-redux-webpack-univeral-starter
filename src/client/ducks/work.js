import Immutable from 'immutable';

const initialState = new Immutable.fromJS({
  loaded: false
});

export const actionTypes = {
  GET_WORK: 'GET_WORK',
  GET_WORK_SUCCESS: 'GET_WORK_SUCCESS',
  GET_WORK_FAILURE: 'GET_WORK_FAILURE',
}

export function isWorkLoaded(globalState) {
  return globalState.work && globalState.work.get('loaded');
}

export function getWork() {
  return {
    // If you are creating a promise based action,
    // makes sure you use "types", and not "type"
    types: [
      actionTypes.GET_WORK,         // Fired when request initiaited
      actionTypes.GET_WORK_SUCCESS, // Fired when success
      actionTypes.GET_WORK_FAILURE  // Fired when failure
    ],
    promise: (client) => client.get('/api/work')
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.GET_WORK:
      return state.set('loading', true);

    case actionTypes.GET_WORK_SUCCESS:
      return state.merge({
        loaded: true,
        loading: false,
        data: action.result
      })

    case actionTypes.GET_WORK_FAILURE:
      return state.merge({
        loaded: false,
        loading: false,
        error: action.error
      }).delete('data');

    default:
      return state;
  }
}
