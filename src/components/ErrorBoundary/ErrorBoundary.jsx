import React from "react";
import {connect} from 'react-redux';
import ErrorIndicator from "../ErrorIndicator";

class ErrorBoundary extends React.Component {
  render() {
    // const { errors } = this.props;
    const hasError = false;
    // const hasError2 = errors.filter(i => i === 'failed').length !== 0;

    if (hasError) return <ErrorIndicator />;

    return this.props.children;
  }
}

const mapStateToProps = (state) => {
  return {
    errors: [
      state.nodeRemovingState,
      state.nodeFetchingState,
      state.nodesFetchingState,
      state.nodeAddState,
      state.nodeUpdateState,
    ]
  }
};

export default connect(mapStateToProps)(ErrorBoundary);