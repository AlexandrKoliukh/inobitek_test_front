import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import cn from 'classnames';

const actionCreators = {
  fetchNodes: actions.fetchNodes,
  changeActiveHeaderItem: actions.uiStateChangeActiveHeaderItem
};

class Header extends React.Component {

  handleClick = (item) => (e) => {
    e.preventDefault();
    const { changeActiveHeaderItem, fetchNodes } = this.props;
    changeActiveHeaderItem({ item });
    fetchNodes(item.id);
  };

  render() {
    const { headerState } = this.props;

    return (
      <div className="sticky-top">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {headerState.map((item) => {
              const itemClasses = cn({
                'breadcrumb-item': true,
                active: item.active,
              });

              return (
                <li
                  className={itemClasses}
                  aria-current={'page'}
                  key={item.id}
                >
                  {item.active ? item.name : <a
                    onClick={this.handleClick(item)}
                    href="/"
                  >{item.name}</a>}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    headerState: state.headerState,
  }
};

export default connect(mapStateToProps, actionCreators)(Header);
