import { PropTypes, Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import moment from 'moment';

const DAY = 24 * 60 * 60 * 1000;

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

      dayClick:  function(m, evt, view) {
        let start = moment(m.format());
        if (!m.hasTime()) {
          start.add(8, 'hours');
        }
        eventClick({
          title: '',
          start: start.format(),
        });
      },
      eventClick: function(calEvent) {
        eventClick(_.assign({}, calEvent, {
          start: calEvent.start.format(),
          end: calEvent.end ? calEvent.end.format() : '',
        }))
      },
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
      this.$el.fullCalendar('addEventSource', function(start, end, tz, cb) {
        let displayEvents = [];
        start = moment(start.format());
        end = moment(end.format());
        console.log(start.format());
        console.log(end.format());
        _.each(events, function(event) {
          let e = {};
          if (event.repeat) {
            let eStart = moment(event.start);
            let eEnd = moment(event.end);
            let duration = eEnd.isValid() ? 
              eEnd.diff(eStart) : newProps.defaultEventLength;
            console.log(eStart.format());
            console.log(end.format());
            let diff = eStart.diff(end);
            console.log(diff);
            if (!(diff > 0 || (eEnd.isValid() && eEnd.diff(start) < 0))) {
              let repeatMoment = end.clone().add(diff % (7 * DAY));

              while (repeatMoment.diff(start) >= 0 && 
                     repeatMoment.diff(eStart) >= 0) {
              console.log(repeatMoment.format());
                displayEvents.push(_.assign({}, event, {
                  start: repeatMoment.format(),
                  end: repeatMoment.clone().add(duration).format(),
                }));
                repeatMoment = repeatMoment.clone().subtract(7, 'days');
              }
            }
          } else {
            displayEvents.push(event);
          }
        });
        console.log(displayEvents);
        cb(displayEvents);
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


