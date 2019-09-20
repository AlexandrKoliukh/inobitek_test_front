import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class NodeForm extends React.Component {

  handleSubmit = (form) => {
    console.log(form);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <div>
            <Field name="Name" required component="input" type="text" className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label>IP</label>
          <div>
            <Field name="IP" required component="input" type="text" className="form-control"/>
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
  return {
    nodes: state.nodes,
  }
};

const ConnectedNodeForm = connect(mapStateToProps, actions)(NodeForm);

export default reduxForm({
  form: 'nodeForm'
})(ConnectedNodeForm);
