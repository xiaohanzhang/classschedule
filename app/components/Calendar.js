import { PropTypes, Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import moment from 'moment';

class Calendar extends Component {
  componentDidMount() {
    const {
      eventClick, saveEvent
    } = this.props;
    const $el = this.$el = $(this.el);

    $el.fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: moment().format(),
      lang: 'zh-cn',
      buttonIcons: true, // show the prev/next text
      weekNumbers: false,
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this.props.events,
      allDayDefault: false,

      dayClick:  function(moment, evt, view) {
        eventClick({
          title: '',
          start: moment.format(),
        });
      },
      eventClick: eventClick,
      eventResize: function(event, delta, revertFunc) {
        if (event.confirm && !confirm(lang.confirmChangeEvent)) {
          revertFunc();
        } else {
          saveEvent(event);
        }
      },
      eventDrop: function(event, delta, revertFunc) {
        if (event.confirm && !confirm(lang.confirmChangeEvent)) {
          revertFunc();
        } else {
          saveEvent(event);
        }
      }
    });
  }

  componentWillReceiveProps(newProps) {
    const events = newProps.events;
    if (this.props.events !== events) {
      this.$el.fullCalendar('removeEvents');
      this.$el.fullCalendar('addEventSource', function(start, end, callback) {
        _.map(events, function(event) {
          moment(event.repeatStart).diff(end) > 0 || 
          event.repeatEnd && moment(event.repeatEnd).diff(start) 
          if (event.repeat && ) {

          }
          
        });
        callback(events);
      });
    }
  }

  render() {
    return (
      <div ref={(el) => this.el = el}></div>
    )
  }
}

export default Calendar;


