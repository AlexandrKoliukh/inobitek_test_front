import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

const actionCreators = {
  updateNode: actions.updateNode,
  fetchNode: actions.fetchNode,
  closeModal: actions.closeEditForm,
};

class NodeDetailsForm extends React.Component {

  handleSubmit = (form) => {
    const { updateNode, nodeDetails, closeModal } = this.props;
    updateNode({ ...form, id: nodeDetails.id, parentId: nodeDetails.parentId });
    closeModal();
  };

  render() {
    const { handleSubmit, reset, submitting, modalState, nodeDetails } = this.props;

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

    // const renderFormState = nodeFetchingState !== 'finished' ? <Loader/> : renderForm();
    return modalState !== 'close' ? renderForm() : null;
  }
}

const mapStateToProps = (state) => {
  const { nodeDetails } = state;
  const { name, ip, port } = nodeDetails;
  return {
    nodeDetails,
    modalState: state.modalState,
    initialValues: { name, ip, port },
  }
};

const initFormState = reduxForm({
  form: 'nodeDetailsForm',
  enableReinitialize: true,
})(NodeDetailsForm);

export default connect(mapStateToProps, actionCreators)(initFormState);
