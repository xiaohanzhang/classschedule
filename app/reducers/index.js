import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import update from 'react-addons-update';
import { ObjectID } from 'bson';

import initialState from '../initialState';

function createReducer(reducers, errorReducers, defaultState={}) {
  return function(state=defaultState, action) {
    let _reducers = action.error ? errorReducers : reducers;
    if (_reducers.hasOwnProperty(action.type)) {
      return _reducers[action.type](state, action);
    } else {
      return state;
    }
  };
}

function reduceReducer(reducers) {
  return function(state, action) {
    return _.reduce(reducers, function(_state, reducer) {
      return reducer(_state, action);
    }, state);
  };
}


const rootReducers = {
  signIn: function(state, action) {
    return {
      ...state,
      user: action.payload,
    };
  },
  signOut: function(state, action) {
    return {
      ...state,
      user: null,
    };
  },
  openEventModal: function(state, action) {
    let event = action.payload;

    return update(state, {
      ui: {eventModal: {
        $set: {show: true, event: event},
      }},
    });
  },
  saveEvent: function(state, action) {
    let event = action.payload
      , op
    ;
    if (!_.has(event, '_id')) {
      event = _.assign({
        _id: new ObjectID().toString(),
        confirm: false,
      }, event);
      op = {$push: [event]};
    } else {
      let index = _.findIndex(_.get(state, 'events'), function(e) {
        return e._id === event._id;
      });
      op = {$splice: [[index, 1, event]]};
    }

    return update(state, {
      events: op,
      ui: {eventModal: {
        event: {$set: event},
      }},
    });
  },
  closeEventModal: function(state, action) {
    return update(state, {
      ui: {eventModal: {
        $set: {show: false, event: null},
      }},
    });
  },
  fetchTeachers: function(state, action) {
    return {
      ...state,
      teachers: action.payload,
    };
  }
}

const errorReducers = {};

function rootErrorReducer(state, action) {
  if (action.error && config.DEBUG) {
    console.log(action);
  }
  return state;
}

export default reduceReducer([
  rootErrorReducer,
  createReducer(rootReducers, errorReducers, initialState),
]);



