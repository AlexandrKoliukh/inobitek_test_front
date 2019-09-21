import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import cn from 'classnames';
import Loader from '../Loader';

const actionCreators = {
  fetchNode: actions.fetchNode,
};

class NodesList extends React.Component {

  handleClick = (id) => (e) => {
    e.preventDefault();
    const { fetchNode } = this.props;
    fetchNode(id);
  };

  render() {
    const { nodes: { byId, allIds }, nodesFetchingState, selectedId } = this.props;
    const nodesList = (
      <ul className="list-group">
        {allIds.map((i) => {
          const node = byId[i];
          const listItemClasses = cn({
            'list-group-item': true,
            active: node.id === selectedId,
          });
          return (
            <li className={listItemClasses} key={node.id}>
              {node.id === selectedId ?
              <span>{node.name}</span> :
              <a href="/" onClick={this.handleClick(node.id)}>{node.name}</a>}
            </li>
          );
        })}
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