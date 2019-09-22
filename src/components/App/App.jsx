import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import NodeForm from '../NodeForm/';
import NodeDetailsForm from '../NodeDetailsForm/NodeDetailsForm';
import Row from '../Row';
import NodesList from '../NodesList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Header from '../Header';

import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends React.Component {

  render() {
    // const { nodeDetails } = this.props;

    return (
      <ErrorBoundary>
        <div className="container">
          <Header/>
          <Row
            left={
              <ErrorBoundary>
                <NodesList/>
              </ErrorBoundary>
            }
            right={
              <ErrorBoundary>
                <NodeForm/>
                <NodeDetailsForm/>
              </ErrorBoundary>
            }
          />
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    nodeDetails: state.nodeDetails,
  }
};

export default connect(mapStateToProps, actions)(App);
