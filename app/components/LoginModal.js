import { PropTypes, Component } from 'react';

import { Modal, Button } from 'react-bootstrap';
import lang from '../lang';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(key) {
    return (e) => {
      this.setState({[key]: e.target.value});
    }
  }

  onSubmit($event) {
    const { username, password } = this.state;
    $event.preventDefault();
    this.props.onSubmit(username, password);
  }

  render() {
    const { show } = this.props;
    const handleChange = this.handleChange.bind(this);

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{lang.signIn}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
              <label>{lang.username}: </label>
              <input type="text" onChange={handleChange('username')}/>
            </div>
            <div>
              <label>{lang.password}: </label>
              <input type="password" 
                onChange={handleChange('password')}/>
            </div>
            <input type="submit" className="hidden" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.onSubmit.bind(this)}
            bsStyle="primary"
          >Sign In</Button>
        </Modal.Footer>
      </Modal>

    )
  } 
}


export default LoginModal;


