import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

import { ip, name, port } from '../../validators/validation';

const actionCreators = {
  updateNode: actions.updateNode,
  fetchNode: actions.fetchNode,
  closeEditForm: actions.closeEditForm,
};

class EditNodeForm extends React.Component {

  handleSubmit = (form) => {
    const { updateNode, nodeDetails, closeEditForm } = this.props;
    updateNode({ ...form, id: nodeDetails.id, parentId: nodeDetails.parentId });
    closeEditForm();
  };

  render() {
    const { handleSubmit, submitting, editFormState, nodeDetails } = this.props;

    const renderForm = () => (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3>Edit: {nodeDetails.name}</h3>
        <div className="form-group">
          <label>Name</label>
          <div>
            <Field name="name"
                   required
                   component="input"
                   type="text"
                   className="form-control"
                   normalize={name}
            />
          </div>
        </div>
        <div className="form-group">
          <label>IP</label>
          <div>
            <Field name="ip"
                   required
                   component="input"
                   type="text"
                   className="form-control"
                   normalize={ip}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Port</label>
          <div>
            <Field name="port"
                   required
                   component="input"
                   type="text"
                   className="form-control"
                   normalize={port}
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    );

    return editFormState !== 'close' ? renderForm() : null;
  }
}

const mapStateToProps = (state) => {
  const { nodeDetails } = state;
  const { name, ip, port } = nodeDetails;
  return {
    nodeDetails,
    editFormState: state.editFormState,
    initialValues: { name, ip, port },
  }
};

const initFormState = reduxForm({
  form: 'nodeDetailsForm',
  enableReinitialize: true,
})(EditNodeForm);

export default connect(mapStateToProps, actionCreators)(initFormState);
