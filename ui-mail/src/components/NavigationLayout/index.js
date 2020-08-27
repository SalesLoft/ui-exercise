import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import NavBtn from '@material-ui/icons/Reorder';
import Inbox from '@material-ui/icons/Inbox';
import Archive from '@material-ui/icons/Archive';
import Delete from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
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
        <NavBtn className="open-close-btn" onClick={this.openCloseMenu.bind(this)}/>
      </div>
      <div className="panel-layout">
        <div className={openMenu ? 'sidebar sidebar-open': 'sidebar sidebar-closed'}>
          <NavLink className="sidebar-item" activeClassName="active" to="/"><Inbox className="icon"/> Inbox</NavLink>
          <b className="tag-title"><Label  className="icon"/> Tags Available ({uniqueTags.length})</b>
            {
              uniqueTags.map((tag, i) => {
              return (
                  <div className={`tag-wrapper tag-${tag}`} key={i}>
                    <NavLink activeClassName="active" to={`/messages/${tag}`}>{tag}</NavLink>
                  </div>
                  )
              })
            }
          <NavLink className="sidebar-item" activeClassName="active" to="/messages/deleted"><Delete className="icon"/> Trash</NavLink>
          <NavLink className="sidebar-item" activeClassName="active" to="/messages/archived"><Archive  className="icon"/> Archived</NavLink>
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

