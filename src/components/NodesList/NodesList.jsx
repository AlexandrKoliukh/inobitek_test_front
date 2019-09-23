import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import NodeItem from '../NodeItem';

const NodesList = (props) => {
  const { nodes: { byId, allIds }, nodesFetchingState } = props;

  const renderNodeList = () =>
    allIds.map((i) => <NodeItem item={byId[i]} key={i}/>);

  const nodesList = (
    <ul className="list-group">
      {allIds.length === 0 ? <span>Empty</span> : renderNodeList()}
    </ul>
  );

  return nodesFetchingState !== 'finished' ? <Loader/> : nodesList;
};

const mapStateToProps = (state) => {
  return {
    nodesFetchingState: state.nodesFetchingState,
    nodes: state.nodes,
  };
};

export default connect(mapStateToProps)(NodesList);