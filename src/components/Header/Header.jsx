import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const actionCreators = {
  fetchNodes: actions.fetchNodes,
};

class Header extends React.Component {
  render() {

    return (
      <div className="sticky-top">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Root</a></li>
            <li className="breadcrumb-item active" aria-current="page">Library</li>
          </ol>
        </nav>
      </div>);
  }
}

const mapStateToProps = () => {

};

export default connect(mapStateToProps, actionCreators)(Header);
