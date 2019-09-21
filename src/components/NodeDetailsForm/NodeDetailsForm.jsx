import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import Loader from '../Loader';

const actionCreators = {
  updateNode: actions.updateNode,
  fetchNode: actions.fetchNode,
};

class NodeDetailsForm extends React.Component {

  handleSubmit = (form) => {
    // const { updateNode } = this.props;
    console.log(form);
  };

  render() {
    const { handleSubmit, reset, submitting, nodeFetchingState } = this.props;

    const renderForm = () => (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <div>
            <Field name="name"
                   required
                   component="input"
                   type="text"
                   className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label>IP</label>
          <div>
            <Field name="ip" required component="input" type="text" className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label>Port</label>
          <div>
            <Field name="port" required component="input" type="text" className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Submit
          </button>
          <button type="button" className="btn btn-secondary" disabled={submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );

    const renderFormState = nodeFetchingState !== 'finished' ? <Loader/> : renderForm();
    return nodeFetchingState !== 'none' ? renderFormState : null;
  }
}

const mapStateToProps = (state) => {
  const { nodeDetails } = state;
  return {
    nodeDetails,
    nodeFetchingState: state.nodeFetchingState,
    values: {
      name: nodeDetails ? nodeDetails.name : '',
      ip: nodeDetails ? nodeDetails.ip : '',
      port: nodeDetails ? nodeDetails.port : '',
    }
  }
};

const initFormState = reduxForm({
  form: 'nodeDetailsForm'
})(NodeDetailsForm);

export default connect(mapStateToProps, actionCreators)(initFormState);
