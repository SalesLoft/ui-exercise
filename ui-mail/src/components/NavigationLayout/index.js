import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import './style.scss'

export default class NavigationLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openMenu: false
    }
  }

  openCloseMenu(openMenu) {
    this.setState({ openMenu: !this.state.openMenu})
  }

  render() {
    const tagsUsed = this.props.tags.messages.map(message => message.tags)
    const uniqueTags = [...new Set(tagsUsed.flat())];
    const {openMenu} = this.state

    return (
      <div className="layout">
      <div className="top-navigation">
        <div className="logo">Ui-MAiL</div>
        <b onClick={this.openCloseMenu.bind(this)}>open</b>
      </div>
      <div className="panel-layout">
        <div className={openMenu ? 'sidebar sidebar-open': 'sidebar sidebar-closed'}>
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
          {this.props.children}
        </div>
      </div>
    </div>
    )
  }
}


NavigationLayout.propTypes = {
  children: PropTypes.any
};

