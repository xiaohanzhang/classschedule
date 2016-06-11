import { createAction }  from 'redux-actions';
import db from '../db';


const keys = [
  'signIn', 'signOut', 'openEventModal', 'saveEvent', 'closeEventModal',
  'fetchTeachers',
];

export const Types = _.zipObject(keys, keys);

const BaseActions = _.mapValues(Types, function(value, key) {
  return createAction(value);
});


const Actions = _.assign({}, BaseActions, {
  signIn: function(username, password) {
    return BaseActions.signIn(db.users[username]);
  },
  fetchTeachers: function() {
    const teachers = _.filter(db.users, function(user) {
      return user.groups.indexOf('teacher') > -1;
    });
    return BaseActions.fetchTeachers(teachers);
  }
});

export default Actions;

