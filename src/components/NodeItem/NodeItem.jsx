import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './node-item.css';

const actionCreators = {
  fetchNodes: actions.fetchNodes,
  nodeDetailsSet: actions.nodeDetailsSet,
  addHeaderItem: actions.uiStateAddHeaderItem,
  openEditForm: actions.openEditForm,
  removeNode: actions.removeNode,
  closeEditForm: actions.closeEditForm
};

class NodeItem extends React.Component {

  handleClickNodeName = (node) => (e) => {
    e.preventDefault();
    const { fetchNodes, addHeaderItem, closeEditForm } = this.props;
    fetchNodes(node.id);
    addHeaderItem({ item: node });
    closeEditForm();
  };

  handleClickNodeInfo = (node) => () => {
    const { nodeDetailsSet, openEditForm } = this.props;
    nodeDetailsSet({ node });
    openEditForm();
  };

  handleClickNodeDelete = (node) => () => {
    const { removeNode, closeEditForm } = this.props;
    removeNode(node);
    closeEditForm();
  };

  render() {
    const { item: node, selectedId } = this.props;

    const listItemClasses = cn({
      'list-group-item': true,
      active: node.id === selectedId,
    });
    return (
      <li className={listItemClasses}>
        <a href="/" onClick={this.handleClickNodeName(node)}>{node.name}</a>
        <button type="button"
                className="btn btn-danger btn-sm float-right"
                onClick={this.handleClickNodeDelete(node)}
        >
          <i className="fa fa-trash-o"/>
        </button>
        <button type="button"
                className="btn btn-success btn-sm float-right"
                onClick={this.handleClickNodeInfo(node)}
        >
          <i className="fa fa-info"/>
        </button>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedId: state.nodeDetails.id
  };
};

export default connect(mapStateToProps, actionCreators)(NodeItem);
