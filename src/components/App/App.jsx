import React from 'react';

import NodeForm from '../NewNodeForm/';
import NodeDetailsForm from '../EditNodeForm/EditNodeForm';
import Row from '../Row';
import NodesList from '../NodesList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Header from '../Header';

import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="container">
        <Header/>
        <Row
          left={
            <NodesList/>
          }
          right={
            <>
              <NodeForm/>
              <NodeDetailsForm/>
            </>
          }
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
