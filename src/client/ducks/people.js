import Immutable from 'immutable';

const initialState = new Immutable.fromJS({
  loaded: false
});

export const actionTypes = {
  GET_PEOPLE: 'GET_PEOPLE',
  GET_PEOPLE_SUCCESS: 'GET_PEOPLE_SUCCESS',
  GET_PEOPLE_FAILURE: 'GET_PEOPLE_FAILURE',
}

export function arePeopleLoaded(globalState) {
  return globalState.people && globalState.people.get('loaded');
}

export function getPeople() {
  return {
    // If you are creating a promise based action,
    // makes sure you use "types", and not "type"
    types: [
      actionTypes.GET_PEOPLE,         // Fired when request initiaited
      actionTypes.GET_PEOPLE_SUCCESS, // Fired when success
      actionTypes.GET_PEOPLE_FAILURE  // Fired when failure
    ],
    promise: (client) => client.get('/api/people')
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.GET_PEOPLE:
      return state.set('loading', true);

    case actionTypes.GET_PEOPLE_SUCCESS:
      return state.merge({
        loaded: true,
        loading: false,
        data: action.result
      })

    case actionTypes.GET_PEOPLE_FAILURE:
      return state.merge({
        loaded: false,
        loading: false,
        error: action.error
      }).delete('data');

    default:
      return state;
  }
}
