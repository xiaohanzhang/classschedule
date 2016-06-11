import { PropTypes, Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Actions from '../actions';
import lang from '../lang';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderUser() {
    let { 
      user,
      actions,
    } = this.props;

    if (user) {
      return (
        <div>
          {user.username},
          <a onClick={actions.signOut}>{lang.signOut}</a>
        </div>
      );
    }
  }

  render() {
    let { user } = this.props;

    return (
      <div className="header">
        {this.renderUser()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return _.pick(state, ['user', ]);
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


