import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import NodeForm from '../NodeForm/';

class App extends React.Component {

  render()  {
    return (
      <div className="container">
        <NodeForm/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    tasks: state.tasks,
  }
};

export default connect(mapStateToProps, actions)(App);
