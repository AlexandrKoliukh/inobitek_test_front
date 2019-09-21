import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class NodesList extends React.Component {

  render() {
    const { nodes: { byId, allIds } } = this.props;
    return (
      <div>
        {allIds.map((i) => {
          const node = byId[i];
          return (
            <div className="card" key={node.id}>
              <div className="card-body">
                {node.name}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
  };
};

export default connect(mapStateToProps, actions)(NodesList);