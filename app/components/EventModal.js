import { PropTypes, Component } from 'react';

import { 
  Modal, Button, Form, FormGroup, FormControl, ControlLabel, Checkbox, Col
} from 'react-bootstrap';
import lang from '../lang';

class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.defaultEvent = {
      title: '',
      teacher: '',
      description: '',
      repeat: false,
      dow: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { event } = nextProps;
    const defaultEvent = this.defaultEvent;
    this.setState(_.assign(
      {}, 
      defaultEvent,
      _.pick(event, _.keys(defaultEvent))
    ));
  }

  handleChange(key) {
    return (e) => {
      this.setState({[key]: e.target.value});
    }
  }

  onSubmit($event) {
    $event.preventDefault();
    this.props.onSubmit(_.assign(
      {},
      this.props.event,
      _.pick(this.state, _.keys(this.defaultEvent))
    ));
  }

  onClose() {
    this.props.onClose();
  }

  onDaySelect(evt) {
    let selected = [];
    _.each(evt.target.children, function(option) {
      if (option.selected)  {
        selected.push(option.value);
      }
    });
    if (selected.length === 0) {
      selected = null;
    }
    this.setState({dow: selected});
  }

  onRepeatCheck(evt) {
    const checked = evt.target.checked
      , event = this.props.event
    ;

    if (checked) {
      this.setState({
        repeat: checked,
        //start: moment()
        //end: 
      });
    } else {
      this.setState({repeat: checked, dow: null});
    }
  }


  render() {
    const { show, teachers } = this.props;
    const handleChange = this.handleChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const onClose = this.onClose.bind(this);

    const teachersOptions = _.map(teachers, function(teacher, key) {
      return <option value={key} key={key}>{teacher.username}</option>
    });

    let daySelect = null;
    if (this.state.repeat) {
      daySelect = (
        <FormControl componentClass="select" multiple
          onChange={this.onDaySelect.bind(this)}>
          <option value="1">{lang.Mon}</option>
          <option value="2">{lang.Tue}</option>
          <option value="3">{lang.Wed}</option>
          <option value="4">{lang.Thu}</option>
          <option value="5">{lang.Fri}</option>
          <option value="6">{lang.Sat}</option>
          <option value="7">{lang.Sun}</option>
        </FormControl>
      );
    }

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{lang.arrangeClass}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>{lang.title}</Col>
              <Col sm={10}>
                <FormControl type="text" 
                  value={this.state.title}
                  onChange={handleChange('title')}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>{lang.description}</Col>
              <Col sm={10}>
                <FormControl 
                  componentClass="textarea"
                  value={this.state.description}
                  onChange={handleChange('description')}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>{lang.repeat}</Col>
              <Col sm={10}>
                <Checkbox value={this.state.repeat}
                  onChange={this.onRepeatCheck.bind(this)}/>
                {daySelect}
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>{lang.teacher}</Col>
              <Col sm={10}>
                <FormControl componentClass="select" 
                  value={this.state.teacher}
                  onChange={handleChange('teacher')}>
                  {teachersOptions}
                </FormControl>
              </Col>
            </FormGroup>
            <input type="submit" className="hidden" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onSubmit}
            bsStyle="primary"
          >{lang.save}</Button>
          <Button
            onClick={onClose}
          >{lang.close}</Button>
        </Modal.Footer>
      </Modal>
    );
  } 
}


export default EventModal;


