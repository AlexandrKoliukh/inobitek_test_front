import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import NodeForm from '../NodeForm/';
import Row from '../Row';
import NodesList from '../NodesList';
import './app.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Header from '../Header';


class App extends React.Component {

  render() {
    // const { nodeDetails } = this.props;

    return (
      <ErrorBoundary>
        <div className="container">
          <Header/>
          <Row
            left={<ErrorBoundary><NodesList/></ErrorBoundary>}
            right={
              <ErrorBoundary>
                <NodeForm/>
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
