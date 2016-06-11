import { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TeacherList from '../components/TeacherList';
import Actions from '../actions';

class SidePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
   
  }

  render() {
    let { teachers, actions } = this.props;

    return (
      <div className="side-panel">
        <TeacherList teachers={teachers}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return _.pick(state, ['teachers']);
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidePanel);


