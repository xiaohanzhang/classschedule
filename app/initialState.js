const initialState = {
  ui: {
    eventModal: {
      show: false,
      event: null,
    },
  },
  user: {
    username: 'user1',
    groups: ['admin'],
  },
  teachers: [],
  events: [{
    _id: '1',
    id: 123,
    title: 'Foo bar',
    allDay: false,
    start: '12:00:00',
    end: '16:00:00',
    className: ['hello', 'world'],
    editable: true,
    startEditable: true,
    durationEditable: true,
    //rendering: '',
    overlap: true,
    //constraint: ''
    color: 'red',
    backgroundColor: 'red',
    borderColor: 'green',
    textColor: 'yellow',
    dow: [1, 4],
  }, {
    _id: '2',
    title: 'Long Event',
    start: '2016-06-07',
    end: '2016-06-10',
    url: 'http://google.com',
  }, {
    _id: '3',
    id: 999,
    title: 'Repeating Event',
    start: '2016-06-09T16:00:00'
  }, {
    _id: '4',
    id: 999,
    title: 'Repeating Event',
    start: '2016-06-16T16:00:00'
  },]
};

export default initialState;
