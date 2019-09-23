import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { ip } from './validation';

class NewNodeForm extends React.Component {

  handleSubmit = (form) => {
    const { addNode, reset, headerState } = this.props;
    const parentId = headerState[headerState.length - 1].id || 0;
    addNode({ ...form, parentId });
    reset();
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, headerState, dbErrors } = this.props;

    const renderDanger = (
      <div className="alert alert-danger" role="alert">
        Добавление завершилось ошибкой, похоже узел с такими данными уже существует.
      </div>
    );

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3>New node to {headerState[headerState.length - 1].name}</h3>
        <div className="form-group">
          <div>
            <label>Name</label>
            <Field
              name="name"
              component="input"
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="ip">IP</label>
            <Field name="ip"
                   component="input"
                   required
                   className="form-control"
                   normalize={ip}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="port">Port</label>
            <Field name="port"
                   component="input"
                   required
                   className="form-control"

            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Submit</button>
          <button type="button" disabled={pristine || submitting}
                  onClick={reset}
                  className="btn btn-secondary"
          >Clear Values
          </button>
        </div>
        {dbErrors.addError ? renderDanger : null}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { nodes, nodeDetails, headerState, dbErrors } = state;
  return {
    nodes,
    headerState,
    dbErrors,
    initialValues: {
      name: nodeDetails ? nodeDetails.name : '',
      ip: nodeDetails ? nodeDetails.ip : '',
      port: nodeDetails ? nodeDetails.port : '',
    }
  }
};

const initFormState = reduxForm({
  form: 'nodeForm',
  // validate,
})(NewNodeForm);

export default connect(mapStateToProps, actions)(initFormState);

