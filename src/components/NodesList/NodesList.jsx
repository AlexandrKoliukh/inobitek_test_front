import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import NodeItem from '../NodeItem';

const NodesList = (props) => {
  const { nodes: { byId, allIds }, nodesFetchingState, nodeUpdateState } = props;

  const renderDanger = (
    <div className="alert alert-danger" role="alert">
      Редактирование завершилось ошибкой, похоже узел с такими данными уже существует.
    </div>
  );

  const renderNodeList = () =>
    allIds.map((i) => <NodeItem item={byId[i]} key={i}/>);

  const nodesList = (
    <ul className="list-group">
      {nodeUpdateState === 'failed' ? renderDanger : null}
      {allIds.length === 0 ? <span>Empty</span> : renderNodeList()}
    </ul>
  );

  return nodesFetchingState !== 'finished' ? <Loader/> : nodesList;
};

const mapStateToProps = (state) => {
  return {
    nodesFetchingState: state.nodesFetchingState,
    nodeUpdateState: state.nodeUpdateState,
    nodes: state.nodes,
  };
};

export default connect(mapStateToProps)(NodesList);