import React from "react";
import {connect} from 'react-redux';
import ErrorIndicator from "../ErrorIndicator";

class ErrorBoundary extends React.Component {
  render() {
    const { errors } = this.props;
    const hasError = errors.filter(i => i[0] === 'failed' && !i[1]).length !== 0;
    if (hasError) return <ErrorIndicator />;

    return this.props.children;
  }
}

const mapStateToProps = (state) => {
  const { dbErrors: {
    addError,
    updateError,
    fetchError,
  } } = state;
  return {
    errors: [
      [state.nodesFetchingState, fetchError],
      [state.nodeAddState, addError],
      [state.nodeUpdateState, updateError],
    ]
  }
};

export default connect(mapStateToProps)(ErrorBoundary);