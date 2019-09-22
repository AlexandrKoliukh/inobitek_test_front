import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import cn from 'classnames';
import Loader from '../Loader';

const actionCreators = {
  fetchNode: actions.fetchNode,
  addHeaderItem: actions.uiStateAddHeaderItem,
};

class NodesList extends React.Component {

  handleClick = (node) => (e) => {
    e.preventDefault();
    const { fetchNode, addHeaderItem } = this.props;
    fetchNode(node.id);
    addHeaderItem({ item: node });
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
              <a href="/" onClick={this.handleClick(node)}>{node.name}</a>}
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