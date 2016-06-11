import { PropTypes, Component } from 'react';

import { 
  Checkbox
} from 'react-bootstrap';


import lang from '../lang';

class TeacherList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    let teachersMap = this.state.teachersMap || {}
      , teachers = newProps.teachers
      , newMap = {}
    ;
    if (this.props.teachers !== teachers) {
      _.each(teachers, function(teacher) {
        teacher = _.assign({}, _.get(teachersMap, teacher._id), teacher);
        newMap[teacher._id] = teacher;
      });
      this.setState({teachersMap: newMap});
    }
    console.log(this.state);
  }

  render() {
    const teacherList =  _.map(this.state.teachersMap, function(teacher) {
      return (
        <Checkbox checked={teacher.selected}>{teacher.username}</Checkbox>
      );
    });

    return (
      <form>
        <div>
        hello
        </div>
        {teacherList}
      </form>
    )
  } 
}


export default TeacherList;


