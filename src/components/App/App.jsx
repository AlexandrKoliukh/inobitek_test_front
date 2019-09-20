import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class App extends React.Component {
  render()  {
    return <div>App{console.log(this.props)}</div>
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    tasks: state.tasks,
  }
};

export default connect(mapStateToProps, actions)(App);
