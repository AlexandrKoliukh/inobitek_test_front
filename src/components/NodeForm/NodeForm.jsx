import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class NodeForm extends React.Component {

  handleSubmit = (form) => {
    const { nodeDetails, addNode, reset } = this.props;
    const parentId = nodeDetails ? nodeDetails.id : 0;
    addNode({ ...form, parentId });
    reset();
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <div>
            <Field name="name" required component="input" type="text" className="form-control"/>
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
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" className="btn btn-secondary" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  const { nodes, node: { nodeDetails } } = state;
  return {
    nodes,
    nodeDetails,
    initialValues: {
      name: nodeDetails ? nodeDetails.name :  '',
      ip: nodeDetails ? nodeDetails.ip : '',
      port: nodeDetails ? nodeDetails.port : '',
    }
  }
};

const initFormState = reduxForm({
  form: 'nodeForm'
})(NodeForm);

export default connect(mapStateToProps, actions)(initFormState);

