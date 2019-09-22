import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './node-item.css';

const actionCreators = {
  fetchNodes: actions.fetchNodes,
  nodeDetailsSet: actions.nodeDetailsSet,
  addHeaderItem: actions.uiStateAddHeaderItem,
  openModal: actions.openModal,
};

class NodeItem extends React.Component {

  handleClickNodeName = (node) => (e) => {
    e.preventDefault();
    const { fetchNodes, addHeaderItem } = this.props;
    fetchNodes(node.id);
    addHeaderItem({ item: node });
  };

  handleClickNodeInfo = (node) => () => {
    const { nodeDetailsSet, openModal } = this.props;
    nodeDetailsSet({ node });
    openModal();
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
