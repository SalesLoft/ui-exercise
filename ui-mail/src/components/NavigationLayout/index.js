import React from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import './style.scss'

const NavigationLayout = ({ tags, children }) => {
  let tagsUsed = tags.messages.map(message => message.tags)
  let uniqueTags = [...new Set(tagsUsed.flat())];

  return (
    <div className="layout">
      <div className="top-navigation">
        Ui-MAiL
      </div>
      <div className="panel-layout">
        <div className="sidebar">
          <NavLink className="sidebar-item" activeClassName="active" to="/">Inbox</NavLink>
          <b className="tag-title"> Tags Available ({uniqueTags.length})</b>
            {
              uniqueTags.map((tag, i) => {
              return (
                  <div className={`tag-wrapper tag-${tag}`} key={i}>
                    <NavLink activeClassName="active" to={`/messages/${tag}`}>{tag}</NavLink>
                  </div>
                  )
              })
            }
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
