import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import NodeForm from '../NodeForm/';
import Row from '../Row';
import NodesList from '../NodesList';
import './app.css';


class App extends React.Component {

  render()  {
    return (
      <div className="container">
        <Row left={<NodesList/>} right={<NodeForm/>}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  }
};

export default connect(mapStateToProps, actions)(App);
