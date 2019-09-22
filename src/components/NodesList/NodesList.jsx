import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import cn from 'classnames';
import Loader from '../Loader';

const actionCreators = {
  fetchNode: actions.fetchNode,
  fetchNodes: actions.fetchNodes,
  nodeDetailsSet: actions.nodeDetailsSet,
  addHeaderItem: actions.uiStateAddHeaderItem,
  openModal: actions.openModal,
};

class NodesList extends React.Component {

  handleClickNodeName = (node) => (e) => {
    e.preventDefault();
    const { fetchNodes, addHeaderItem } = this.props;
    fetchNodes(node.id);
    addHeaderItem({ item: node });
  };

  handleClickNodeInfo = (id) => () => {
    const { nodes, nodeDetailsSet, openModal } = this.props;
    nodeDetailsSet({ node: nodes.byId[id] });
    openModal();
  };

  render() {
    const { nodes: { byId, allIds }, nodesFetchingState, selectedId } = this.props;

    const renderNodeList = () => (
      allIds.map((i) => {
        const node = byId[i];
        const listItemClasses = cn({
          'list-group-item': true,
          active: node.id === selectedId,
        });
        return (
          <li className={listItemClasses} key={node.id}>
            {node.id === selectedId ?
              <span>{node.name}</span> :
              <a href="/" onClick={this.handleClickNodeName(node)}>{node.name}</a>}
            <button type="button"
                    className="btn btn-danger btn-sm float-right"
            >
              <i className="fa fa-trash-o"/>
            </button>
            <button type="button"
                    className="btn btn-success btn-sm float-right"
                    onClick={this.handleClickNodeInfo(node.id)}
            >
              <i className="fa fa-info"/>
            </button>
          </li>
        );
      })
    );

    const nodesList = (
      <ul className="list-group">
        {allIds.length === 0 ? <span>Empty</span> : renderNodeList()}
      </ul>
    );

    return nodesFetchingState !== 'finished' ? <Loader/> : nodesList;
  }
}

const mapStateToProps = (state) => {
  return {
    nodesFetchingState: state.nodesFetchingState,
    nodes: state.nodes,
    selectedId: state.nodeDetails.id
  };
};

export default connect(mapStateToProps, actionCreators)(NodesList);