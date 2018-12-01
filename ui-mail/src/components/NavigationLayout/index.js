import React from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import './style.scss'

const NavigationLayout = ({children}) => {
  return (
    <div className="layout">
      <div className="top-navigation">
        Ui-MAiL
      </div>
      <div className="panel-layout">
        <div className="sidebar">
          <NavLink className="sidebar-item" activeClassName="active" to="/">Inbox</NavLink>
          <NavLink className="sidebar-item" activeClassName="active" to="/messages/:tags">Work</NavLink>
          <NavLink className="sidebar-item" activeClassName="active" to="/messages/:tags">Travel</NavLink>
          <NavLink className="sidebar-item" activeClassName="active" to="/messages/deleted">Trash</NavLink>
          <NavLink className="sidebar-item" activeClassName="active" to="/messages/archived">Archived</NavLink>
        </div>
        <div className="messages-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

NavigationLayout.propTypes = {
  children: PropTypes.any
};

export default NavigationLayout
