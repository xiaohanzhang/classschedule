import { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Actions from '../actions';
import Header from './Header';
import Calendar from '../components/Calendar';
import LoginModal from '../components/LoginModal';
import EventModal from '../components/EventModal';
import SidePanel from './SidePanel';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    props.actions.fetchTeachers();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  handleResize() {
    const size = _.at(this.mainPanel, ['offsetWidth', 'offsetHeight']);
    this.setState({
      boardWidth: _.min(size),
    });
  }

  render() {
    let { ui, user, teachers, actions } = this.props;
    let defaultEventLength = 2 * 60 * 60 * 1000;
    return (
      <div className="app">
        <Header/>
        <div className="main-container">
          <div className="main-panel" ref={el => this.mainPanel = el}>
            <Calendar 
              events={this.props.events}
              eventClick={actions.openEventModal}
              saveEvent={actions.saveEvent}
              defaultEventLength={defaultEventLength}
            />
          </div>
          <SidePanel/>
        </div>
        <LoginModal show={!user} onSubmit={actions.signIn}/>
        <EventModal show={ui.eventModal.show} 
          event={ui.eventModal.event}
          defaultEventLength={defaultEventLength}
          teachers={teachers} 
          onClose={actions.closeEventModal}
          onSubmit={actions.saveEvent}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return _.pick(state, ['events', 'user', 'ui', 'teachers']);
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


